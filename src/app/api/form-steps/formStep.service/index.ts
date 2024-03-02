import { ObjectType } from "dynamoose/dist/General";
import Form_Steps, { IFormStep, IFormStepsFilters } from "../formStep.model";
import Legal_Documents, {
  ILegalDocument,
} from "../../legal-documents/legalDocument.model";
import dynamoose from "dynamoose";
import ApiError from "@/utils/server/ErrorHandelars/ApiError";
import httpStatus from "http-status";
import Fields_Block, {
  IFieldsBlock,
} from "../../fields-blocks/fieldsBlock.model";

const findAll = async (
  filtersOptions: IFormStepsFilters
): Promise<ObjectType> => {
  const conditions: IFormStepsFilters = {};

  if (filtersOptions.documentId) {
    conditions.legalDocument = filtersOptions.documentId;
  }
  const response = await Form_Steps.scan({ ...conditions }).exec();
  return (await response).sort((a, b) => {
    return a.createdAt < b.createdAt ? -1 : 1;
  });
};

const findOne = async (id: string) => {
  const response = await Form_Steps.get(id);

  if (!response) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Form Step Not Found");
  }

  const result = (await response?.populate()).toJSON() as IFormStep;

  if (result) {
    const blocksPromise = Promise.all(
      result.blocks.map(async (blockID) => {
        return (
          await Fields_Block.get(blockID as string)
        ).toJSON() as IFieldsBlock;
      })
    );

    const blocks = await blocksPromise;

    result.blocks = blocks?.sort((a, b) => {
      return a.createdAt < b.createdAt ? -1 : 1;
    });
  }

  return result;
};

const create = async (data: IFormStep) => {
  const result = await Form_Steps.create(data);
  if (result?.id) {
    await Legal_Documents.update(
      { id: data.legalDocument },
      {
        steps: [
          ...(await Legal_Documents.get(data?.legalDocument as string))?.steps,
          result.id,
        ],
      }
    );
  }
  return result;
};

const updateOne = async (id: string, data: IFormStep) => {
  const result = await Form_Steps.update({ id }, data);
  return result;
};

const deleteOne = async (id: string, legalDocument: ILegalDocument) => {
  const remainFormSteps = legalDocument.steps.filter((stepID) => {
    return stepID !== id;
  });

  await dynamoose.transaction([
    Form_Steps.transaction.delete(id),
    Legal_Documents.transaction.update(
      { id: legalDocument?.id },
      {
        steps: remainFormSteps,
      }
    ),
  ]);
};

const isExists = async (data: IFormStep) => {
  const { legalDocument, label } = data;
  const result = (
    await Form_Steps.scan({ legalDocument, label }).exec()
  ).toJSON();

  return result;
};

export const FormStepService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
  isExists,
};

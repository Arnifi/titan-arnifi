import { ObjectType } from "dynamoose/dist/General";
import dynamoose from "dynamoose";
import Fields_Block, {
  IFieldsBlock,
  IFieldsBlockFilters,
} from "../fieldsBlock.model";
import Form_Steps, { IFormStep } from "../../form-steps/formStep.model";
import Form_Fields, { IFormField } from "../../form-fields/formField.model";
import ApiError from "@/utils/server/ErrorHandelars/ApiError";
import httpStatus from "http-status";

const findAll = async (
  filtersOptions: IFieldsBlockFilters
): Promise<ObjectType> => {
  const conditions: IFieldsBlockFilters = {};

  if (filtersOptions.stepId) {
    conditions.step = filtersOptions.stepId;
  }
  const response = await Fields_Block.scan({ ...conditions }).exec();

  const fieldsBlocksPromise = Promise.all(
    (response || []).map(async (fieldBlock) => {
      const fieldsPromise = Promise.all(
        (fieldBlock.fields || []).map(async (fieldID: string) => {
          const field = await Form_Fields.get(fieldID);
          return field;
        })
      );

      fieldBlock.fields = (await fieldsPromise).sort((a, b) =>
        a.createdAt < b.createdAt ? -1 : 1
      );
      return fieldBlock;
    })
  );

  return (await fieldsBlocksPromise).sort((a, b) => {
    return a.createdAt < b.createdAt ? -1 : 1;
  });
};

const findOne = async (id: string): Promise<IFieldsBlock> => {
  const response = await Fields_Block.get(id);

  if (!response) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Fields Block Not Found");
  }

  const result = (await (await response?.populate())?.toJSON()) as IFieldsBlock;

  if (result) {
    const fieldsPromise = Promise.all(
      result.fields.map(async (fieldId) => {
        return (
          await Form_Fields.get(fieldId as string)
        ).toJSON() as IFormField;
      })
    );
    const fields = await fieldsPromise;
    result.fields = fields?.sort((a, b) => {
      return a.createdAt < b.createdAt ? -1 : 1;
    });
  }

  return result;
};

const create = async (data: IFieldsBlock) => {
  const result = await Fields_Block.create(data);
  if (result?.id) {
    await Form_Steps.update(
      { id: data.step },
      {
        blocks: [
          ...(await Form_Steps.get(data?.step as string))?.blocks,
          result.id,
        ],
      }
    );
  }
  return result;
};

const updateOne = async (id: string, data: IFieldsBlock) => {
  const result = await Fields_Block.update({ id }, data);
  return result;
};

const deleteOne = async (id: string, formStep: IFormStep) => {
  const remainFormSteps = formStep.blocks.filter((blockId) => {
    return blockId !== id;
  });

  await dynamoose.transaction([
    Fields_Block.transaction.delete(id),
    Form_Steps.transaction.update(
      { id: formStep?.id },
      {
        blocks: remainFormSteps,
      }
    ),
  ]);
};

const isExists = async (data: IFieldsBlock) => {
  const { step, label, type } = data;
  const result = (await Form_Steps.scan({ step, label, type }).exec()).toJSON();

  return result;
};

export const FieldBlockService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
  isExists,
};

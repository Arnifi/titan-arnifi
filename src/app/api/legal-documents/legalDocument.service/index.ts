import { ObjectType } from "dynamoose/dist/General";
import ApiError from "@/utils/server/ErrorHandelars/ApiError";
import httpStatus from "http-status";
import Form_Steps from "../../form-steps/formStep.model";
import Legal_Documents, {
  ILegalDocument,
  ILegalsFilters,
} from "../legalDocument.model";
import Fields_Block from "../../fields-blocks/fieldsBlock.model";

const findAll = async (filtersOptions: ILegalsFilters): Promise<ObjectType> => {
  const { search, ...filterData } = filtersOptions;

  const conditions: ILegalsFilters = {};
  Object.keys(filterData).map((key) => {
    if (filterData[key]) {
      conditions[key] = filterData[key];
    }
  });

  const response = await Legal_Documents.scan(conditions)
    .where("title")
    .contains(search || "")
    .exec();
  return (await response).sort((a, b) => {
    return a.createdAt > b.createdAt ? -1 : 1;
  });
};

const findOne = async (id: string) => {
  const response = await Legal_Documents.get(id);

  if (!response) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Legal Document Not Found");
  }

  const stepsPromise = response?.steps?.map(async (stepID: string) => {
    const step = await Form_Steps.get(stepID);

    const fieldsBlocks = step?.blocks?.map(async (blockID: string) => {
      const block = await Fields_Block.get(blockID);
      return block;
    });

    step.blocks = (await Promise.all(fieldsBlocks)).sort((a, b) => {
      return a.createdAt < b.createdAt ? -1 : 1;
    });

    return step;
  });

  const steps = (await Promise.all(stepsPromise)).sort((a, b) => {
    return a.createdAt < b.createdAt ? -1 : 1;
  });

  response.steps = steps;
  return response;
};

const create = async (data: ILegalDocument) => {
  data.title = data.title.toLowerCase();
  const result = await Legal_Documents.create(data);
  return result;
};

const updateOne = async (id: string, data: ILegalDocument) => {
  const result = await Legal_Documents.update({ id }, data);
  return result;
};

const deleteOne = async (id: string) => {
  const result = await Legal_Documents.delete(id);
  return result;
};

const isExists = async (data: ILegalDocument) => {
  const { title, country, type } = data;
  const result = await Legal_Documents.scan({ title, country, type }).exec();
  return result;
};

export const LegalDocumentService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
  isExists,
};

import { ObjectType } from "dynamoose/dist/General";
import ApiError from "@/utils/server/ErrorHandelars/ApiError";
import httpStatus from "http-status";
import Templates, { ITemplate } from "../templates.model";
import { LegalDocumentService } from "../../legal-documents/legalDocument.service";

const findAll = async (): Promise<ObjectType> => {
  const response = await Templates.scan().exec();
  return (await response).sort((a, b) => {
    return a.createdAt > b.createdAt ? -1 : 1;
  });
};

const findOne = async (documentID: string) => {
  const response = await Templates.scan("document")
    .eq(documentID)
    .limit(1)
    .exec();
  const template = response[0];
  if (!template) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Template Not Found");
  } else {
    const document = await LegalDocumentService.findOne(
      template?.document as string
    );
    template.document = document;
  }
  return template;
};

const create = async (data: ITemplate) => {
  const result = await Templates.create(data);
  return result;
};

const updateOne = async (id: string, data: ITemplate) => {
  const result = await Templates.update({ id }, data);
  return result;
};

const deleteOne = async (id: string) => {
  const result = await Templates.delete(id);
  return result;
};

export const TemplateService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
};

import { ObjectType } from "dynamoose/dist/General";
import Templates, { ITemplate } from "../templates.model";
import { LegalDocumentService } from "../../legal-documents/legalDocument.service";
import { ILegalDocument } from "../../legal-documents/legalDocument.model";

const findAll = async (): Promise<ObjectType> => {
  const response = await Templates.scan().exec();
  return (await response).sort((a, b) => {
    return a.createdAt > b.createdAt ? -1 : 1;
  });
};

const findOne = async (id: string) => {
  const response = await Templates.get(id);
  return response;
};

const create = async (data: ITemplate) => {
  const result = await Templates.create(data);

  if (result?.id) {
    await LegalDocumentService.updateOne(result?.document, {
      template: result?.id,
    } as ILegalDocument);
  }

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

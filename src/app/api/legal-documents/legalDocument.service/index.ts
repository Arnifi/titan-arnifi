import { ObjectType } from "dynamoose/dist/General";
import Legal_Documents, { ILegalDocument } from "../legalDocument.model";

const findAll = async (): Promise<ObjectType> => {
  const response = await Legal_Documents.scan().exec();
  return (await response).sort((a, b) => {
    return a.createdAt > b.createdAt ? -1 : 1;
  });
};

const findOne = async (id: string) => {
  const response = await Legal_Documents.get(id);
  return response;
};

const create = async (data: ILegalDocument) => {
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

import { ObjectType } from "dynamoose/dist/General";
import Form_Steps, { IFormStep } from "../legalDocument.model";

const findAll = async (): Promise<ObjectType> => {
  const response = await Form_Steps.scan().exec();
  return (await response).sort((a, b) => {
    return a.createdAt > b.createdAt ? -1 : 1;
  });
};

const findOne = async (id: string) => {
  const response = await Form_Steps.get(id);
  return response;
};

const create = async (data: IFormStep) => {
  const result = await Form_Steps.create(data);
  return result;
};

const updateOne = async (id: string, data: IFormStep) => {
  const result = await Form_Steps.update({ id }, data);
  return result;
};

const deleteOne = async (id: string) => {
  const result = await Form_Steps.delete(id);
  return result;
};

const isExists = async (data: IFormStep) => {
  const { legalDocument, label, type } = data;
  const result = await Form_Steps.scan({ legalDocument, label, type }).exec();
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

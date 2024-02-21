import { ObjectType } from "dynamoose/dist/General";
import Form_Fields, { IFormField } from "../formField.model";

const findAll = async (): Promise<ObjectType> => {
  const response = await Form_Fields.scan().exec();
  return (await response).sort((a, b) => {
    return a.createdAt > b.createdAt ? -1 : 1;
  });
};

const findOne = async (id: string): Promise<IFormField> => {
  const response = await Form_Fields.get(id);
  return (await response?.populate())?.toJSON() as IFormField;
};

const create = async (data: IFormField) => {
  const result = await Form_Fields.create(data);
  return result;
};

const updateOne = async (id: string, data: IFormField) => {
  const result = await Form_Fields.update({ id }, data);
  return result;
};

const deleteOne = async (id: string) => {
  await Form_Fields.delete(id);
};

const isExists = async (data: IFormField) => {
  const { step, name, label, type } = data;
  const result = (
    await Form_Fields.scan({ step, name, label, type }).exec()
  ).toJSON();

  return result;
};

export const FormFieldService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
  isExists,
};

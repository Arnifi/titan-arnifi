import { ObjectType } from "dynamoose/dist/General";
import Input_Fields, { IInputField } from "../inputField.model";

const findAll = async (): Promise<ObjectType> => {
  const response = await Input_Fields.scan().exec();
  return (await response).sort((a, b) => {
    return a.createdAt > b.createdAt ? -1 : 1;
  });
};

const findOne = async (id: string): Promise<IInputField> => {
  const response = await Input_Fields.get(id);
  return (await response?.populate())?.toJSON() as IInputField;
};

const create = async (data: IInputField) => {
  const result = await Input_Fields.create(data);
  return result;
};

const updateOne = async (id: string, data: IInputField) => {
  const result = await Input_Fields.update({ id }, data);
  return result;
};

const deleteOne = async (id: string) => {
  await Input_Fields.delete(id);
};

const isExists = async (data: IInputField) => {
  const { step, name, label, type } = data;
  const result = (
    await Input_Fields.scan({ step, name, label, type }).exec()
  ).toJSON();

  return result;
};

export const InputFieldService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
  isExists,
};

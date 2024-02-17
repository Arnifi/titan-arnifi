import { ObjectId } from "mongoose";
import InputField, { IInputField } from "../field.model";

const findAll = async (): Promise<IInputField[]> => {
  const response = await InputField.find();
  return response;
};

const findOne = async (_id: ObjectId): Promise<IInputField | null> => {
  const response = await InputField.findById(_id);
  return response;
};

const create = async (data: IInputField): Promise<IInputField> => {
  const result = await InputField.create(data);
  return result;
};

const updateOne = async (
  data: IInputField,
  id: ObjectId
): Promise<IInputField | null> => {
  const result = await InputField.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteOne = async (id: ObjectId): Promise<IInputField | null> => {
  const result = await InputField.findByIdAndDelete(id);

  return result;
};

export const InputFieldService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
};

import { ObjectId } from "mongoose";
import Field, { IField } from "../field.model";

const findAll = async (): Promise<IField[]> => {
  const response = await Field.find();
  return response;
};

const findOne = async (_id: ObjectId): Promise<IField | null> => {
  const response = await Field.findById(_id).populate({
    path: "options",
  });
  return response;
};

const create = async (data: IField): Promise<IField> => {
  const result = await Field.create(data);

  return result;
};

const updateOne = async (
  data: IField,
  id: ObjectId
): Promise<IField | null> => {
  const result = await Field.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteOne = async (id: ObjectId): Promise<IField | null> => {
  const result = await Field.findByIdAndDelete(id);

  return result;
};

export const FieldService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
};

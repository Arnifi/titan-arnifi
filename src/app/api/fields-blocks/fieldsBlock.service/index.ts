import { ObjectId } from "mongoose";
import FieldBlock, { IFieldBlock } from "../fieldsBlock.model";

const findAll = async (): Promise<IFieldBlock[]> => {
  const response = await FieldBlock.find().sort({ createdAt: 1 });
  return response;
};

const findOne = async (_id: ObjectId): Promise<IFieldBlock | null> => {
  const response = await FieldBlock.findById(_id);
  return response;
};

const create = async (data: IFieldBlock): Promise<IFieldBlock> => {
  const result = await FieldBlock.create(data);

  return result;
};

const updateOne = async (
  data: IFieldBlock,
  id: ObjectId
): Promise<IFieldBlock | null> => {
  const result = await FieldBlock.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteOne = async (id: ObjectId): Promise<IFieldBlock | null> => {
  const result = await FieldBlock.findByIdAndDelete(id);

  return result;
};

export const FieldBlockService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
};

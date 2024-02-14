import { ObjectId } from "mongoose";
import Field, { IField } from "../field.model";
import Divider from "../../dividers/divider.model";

const findAll = async (): Promise<IField[]> => {
  const response = await Field.find();
  return response;
};

const findOne = async (_id: ObjectId): Promise<IField | null> => {
  const response = await Field.findById(_id).populate("dividerID");
  return response;
};

const create = async (data: IField): Promise<IField> => {
  const result = await Field.create(data);

  if (result._id) {
    await Divider.findByIdAndUpdate(result.dividerID, {
      $push: {
        fields: result._id,
      },
    });
  }

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

  if (result?._id) {
    await Divider.findByIdAndUpdate(data.dividerID, {
      $pull: {
        fields: data.dividerID,
      },
      $push: {
        steps: result._id,
      },
    });
  }
  return result;
};

const deleteOne = async (id: ObjectId): Promise<IField | null> => {
  const result = await Field.findByIdAndDelete(id);

  if (result?._id) {
    await Divider.findByIdAndUpdate(result.dividerID, {
      $pull: {
        fields: result._id,
      },
    });
  }

  return result;
};

export const FieldService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
};

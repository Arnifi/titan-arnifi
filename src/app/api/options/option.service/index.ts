import { ObjectId } from "mongoose";
import Option, { IOption } from "../option.model";
import Field from "../../fields/field.model";

const findAll = async (): Promise<IOption[]> => {
  const response = await Option.find();
  return response;
};

const findOne = async (_id: ObjectId): Promise<IOption | null> => {
  const response = await Option.findById(_id).populate("fieldID");
  return response;
};

const create = async (data: IOption): Promise<IOption> => {
  const result = await Option.create(data);

  if (result._id) {
    await Field.findByIdAndUpdate(result.fieldID, {
      $push: {
        options: result._id,
      },
    });
  }

  return result;
};

const updateOne = async (
  data: IOption,
  id: ObjectId
): Promise<IOption | null> => {
  const result = await Option.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (result?._id) {
    await Field.findByIdAndUpdate(data.fieldID, {
      $pull: {
        options: data.fieldID,
      },
      $push: {
        steps: result._id,
      },
    });
  }
  return result;
};

const deleteOne = async (id: ObjectId): Promise<IOption | null> => {
  const result = await Option.findByIdAndDelete(id);

  if (result?._id) {
    await Field.findByIdAndUpdate(result.fieldID, {
      $pull: {
        options: result._id,
      },
    });
  }

  return result;
};

export const OptionService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
};

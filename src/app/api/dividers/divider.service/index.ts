import { ObjectId } from "mongoose";
import Legal from "../../legals/legal.models";
import Divider, { IDivider } from "../divider.model";

const findAll = async (): Promise<IDivider[]> => {
  const response = await Divider.find();
  return response;
};

const findOne = async (_id: ObjectId): Promise<IDivider | null> => {
  const response = await Divider.findById(_id).populate("stepID");
  return response;
};

const create = async (data: IDivider): Promise<IDivider> => {
  const result = await Divider.create(data);

  if (result._id) {
    await Legal.findByIdAndUpdate(result.stepID, {
      $push: {
        steps: result._id,
      },
    });
  }

  return result;
};

const updateOne = async (
  data: IDivider,
  id: ObjectId
): Promise<IDivider | null> => {
  const result = await Divider.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (result?._id) {
    await Legal.findByIdAndUpdate(result.stepID, {
      $pull: {
        steps: data.stepID,
      },
      $push: {
        steps: result._id,
      },
    });
  }
  return result;
};

const deleteOne = async (id: ObjectId): Promise<IDivider | null> => {
  const result = await Divider.findByIdAndDelete(id);

  if (result?._id) {
    await Legal.findByIdAndUpdate(result.stepID, {
      $pull: {
        steps: result._id,
      },
    });
  }

  return result;
};

export const DividerService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
};

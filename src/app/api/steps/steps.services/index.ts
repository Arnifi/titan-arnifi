import { ObjectId } from "mongoose";
import Step, { IStep } from "../steps.models";
import Legal from "../../legals/legal.models";

const findAll = async (): Promise<IStep[]> => {
  const response = await Step.find();
  return response;
};

const findOne = async (_id: ObjectId): Promise<IStep | null> => {
  const response = await Step.findById(_id).populate("legalID");
  return response;
};

const create = async (data: IStep): Promise<IStep> => {
  const result = await Step.create(data);

  if (result._id) {
    await Legal.findByIdAndUpdate(result.legalID, {
      $push: {
        steps: result._id,
      },
    });
  }

  return result;
};

const updateOne = async (data: IStep, id: ObjectId): Promise<IStep | null> => {
  const result = await Step.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (result?._id) {
    await Legal.findByIdAndUpdate(result.legalID, {
      $pull: {
        steps: data.legalID,
      },
      $push: {
        steps: result._id,
      },
    });
  }
  return result;
};

const deleteOne = async (id: ObjectId): Promise<IStep | null> => {
  const result = await Step.findByIdAndDelete(id);

  if (result?._id) {
    await Legal.findByIdAndUpdate(result.legalID, {
      $pull: {
        steps: result._id,
      },
    });
  }

  return result;
};

export const StepService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
};

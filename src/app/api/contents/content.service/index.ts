import { ObjectId } from "mongoose";
import Content, { IContent } from "../content.model";
import Step from "../../steps/steps.models";

const findAll = async () => {
  const response = await Content.find();
  return response;
};

const findOne = async (_id: ObjectId) => {
  const response = await Content.findById(_id).populate("stepID");
  return response;
};

const create = async (data: IContent): Promise<IContent> => {
  const result = await Content.create(data);

  if (result._id) {
    await Step.findByIdAndUpdate(result.stepID, {
      $push: {
        contents: result._id,
      },
    });
  }

  return result;
};

const updateOne = async (
  data: IContent,
  id: ObjectId
): Promise<IContent | null> => {
  const result = await Content.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteOne = async (id: ObjectId): Promise<IContent | null> => {
  const result = await Content.findByIdAndDelete(id);
  return result;
};

export const ContentService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
};

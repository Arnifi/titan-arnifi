import { ObjectId } from "mongoose";
import FormStep, { IFormStep } from "../formStep.model";

const findAll = async (): Promise<IFormStep[]> => {
  const response = await FormStep.find().sort({ createdAt: 1 });
  return response;
};

const findOne = async (_id: ObjectId): Promise<IFormStep | null> => {
  const response = await FormStep.findById(_id);
  return response;
};

const create = async (data: IFormStep): Promise<IFormStep> => {
  const result = await FormStep.create(data);

  return result;
};

const updateOne = async (
  data: IFormStep,
  id: ObjectId
): Promise<IFormStep | null> => {
  const result = await FormStep.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteOne = async (id: ObjectId): Promise<IFormStep | null> => {
  const result = await FormStep.findByIdAndDelete(id);

  return result;
};

export const FormStepService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
};

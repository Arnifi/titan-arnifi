import { ObjectId } from "mongoose";
import FormStep, { IFormStep } from "../formStep.model";
import LegalDocument from "../../legal-documents/legalDocument.model";

const findAll = async (): Promise<IFormStep[]> => {
  const response = await FormStep.find().sort({ createdAt: 1 });
  return response;
};

const findOne = async (_id: ObjectId): Promise<IFormStep | null> => {
  const response = await FormStep.findById(_id).populate([
    {
      path: "legalID",
      select: ["_id", "title", "type"],
    },
    {
      path: "fieldsBlocks",
      select: ["-__v", "-createdAt", "-updatedAt", "-stepID"],
    },
  ]);
  return response;
};

const create = async (data: IFormStep): Promise<IFormStep> => {
  const result = await FormStep.create(data);

  if (result._id) {
    await LegalDocument.findByIdAndUpdate(data.legalID, {
      $push: { steps: result._id },
    });
  }

  return result;
};

const updateOne = async (
  data: IFormStep,
  id: ObjectId
): Promise<IFormStep | null> => {
  const formStep = await FormStep.findById(id);

  const result = await FormStep.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (result?._id) {
    await LegalDocument.findByIdAndUpdate(formStep?.legalID, {
      $pull: { steps: formStep?._id },
    });

    await LegalDocument.findByIdAndUpdate(result.legalID, {
      $push: { steps: result._id },
    });
  }

  return result;
};

const deleteOne = async (id: ObjectId): Promise<IFormStep | null> => {
  const result = await FormStep.findByIdAndDelete(id);

  if (result?._id) {
    await LegalDocument.findByIdAndUpdate(result.legalID, {
      $pull: { steps: result._id },
    });
  }

  return result;
};

export const FormStepService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
};

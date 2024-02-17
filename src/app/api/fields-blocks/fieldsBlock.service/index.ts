import { ObjectId } from "mongoose";
import FieldBlock, { IFieldBlock } from "../fieldsBlock.model";
import FormStep from "../../form-steps/formStep.model";

const findAll = async (): Promise<IFieldBlock[]> => {
  const response = await FieldBlock.find().sort({ createdAt: 1 });
  return response;
};

const findOne = async (_id: ObjectId): Promise<IFieldBlock | null> => {
  const response = await FieldBlock.findById(_id).populate({
    path: "stepID",
    select: ["_id", "label"],
  });

  return response;
};

const create = async (data: IFieldBlock): Promise<IFieldBlock> => {
  const result = await FieldBlock.create(data);

  if (result._id) {
    await FormStep.findByIdAndUpdate(result.stepID, {
      $push: {
        fieldsBlocks: result._id,
      },
    });
  }

  return result;
};

const updateOne = async (
  data: IFieldBlock,
  id: ObjectId
): Promise<IFieldBlock | null> => {
  const fieldsBlock = await FieldBlock.findById(id);
  const result = await FieldBlock.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (result?._id) {
    await FormStep.findByIdAndUpdate(fieldsBlock?.stepID, {
      $pull: { fieldsBlock: fieldsBlock?._id },
    });

    await FormStep.findByIdAndUpdate(result.stepID, {
      $push: { fieldsBlock: result._id },
    });
  }

  return result;
};

const deleteOne = async (id: ObjectId): Promise<IFieldBlock | null> => {
  const result = await FieldBlock.findByIdAndDelete(id);

  if (result?._id) {
    await FormStep.findByIdAndUpdate(result.stepID, {
      $pull: { fieldsBlock: result._id },
    });
  }

  return result;
};

export const FieldBlockService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
};

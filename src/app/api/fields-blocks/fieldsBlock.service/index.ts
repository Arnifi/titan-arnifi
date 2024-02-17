import { ObjectId } from "mongoose";
import FieldsBlock, { IFieldsBlock } from "../fieldsBlock.model";
import FormStep from "../../form-steps/formStep.model";

const findAll = async (): Promise<IFieldsBlock[]> => {
  const response = await FieldsBlock.find().sort({ createdAt: 1 });
  return response;
};

const findOne = async (_id: ObjectId): Promise<IFieldsBlock | null> => {
  const response = await FieldsBlock.findById(_id).populate([
    {
      path: "stepID",
      select: ["_id", "label"],
    },
    {
      path: "fields",
      select: ["-__v", "-createdAt", "-updatedAt"],
    },
  ]);

  return response;
};

const create = async (data: IFieldsBlock): Promise<IFieldsBlock> => {
  const result = await FieldsBlock.create(data);

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
  data: IFieldsBlock,
  id: ObjectId
): Promise<IFieldsBlock | null> => {
  const fieldsBlock = await FieldsBlock.findById(id);
  const result = await FieldsBlock.findByIdAndUpdate(id, data, {
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

const deleteOne = async (id: ObjectId): Promise<IFieldsBlock | null> => {
  const result = await FieldsBlock.findByIdAndDelete(id);

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

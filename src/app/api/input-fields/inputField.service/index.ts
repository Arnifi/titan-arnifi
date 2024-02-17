import { ObjectId } from "mongoose";
import InputField, { IInputField } from "../inputField.model";
import FieldsBlock from "../../fields-blocks/fieldsBlock.model";

const findAll = async (): Promise<IInputField[]> => {
  const response = await InputField.find();
  return response;
};

const findOne = async (_id: ObjectId): Promise<IInputField | null> => {
  const response = await InputField.findById(_id).populate({
    path: "blockID",
    select: ["_id", "label", "isShow"],
  });
  return response;
};

const create = async (data: IInputField): Promise<IInputField> => {
  const result = await InputField.create(data);

  if (result._id) {
    await FieldsBlock.findByIdAndUpdate(result.blockID, {
      $push: {
        fields: result._id,
      },
    });
  }
  return result;
};

const updateOne = async (
  data: IInputField,
  id: ObjectId
): Promise<IInputField | null> => {
  const inputField = await InputField.findById(id);

  const result = await InputField.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (result?._id) {
    await FieldsBlock.findByIdAndUpdate(inputField?.blockID, {
      $pull: {
        fields: inputField?._id,
      },
    });

    await FieldsBlock.findByIdAndUpdate(result.blockID, {
      $push: {
        fields: result._id,
      },
    });
  }

  return result;
};

const deleteOne = async (id: ObjectId): Promise<IInputField | null> => {
  const result = await InputField.findByIdAndDelete(id);

  if (result?._id) {
    await FieldsBlock.findByIdAndUpdate(result.blockID, {
      $pull: {
        fields: result._id,
      },
    });
  }

  return result;
};

export const InputFieldService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
};

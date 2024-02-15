import {
  IPaginationOptions,
  paginationHelpers,
} from "@/utils/server/helpers/paginationHelper";
import Legal, { ILegal } from "../legal.models";
import { ObjectId } from "mongoose";

const findAll = async (paginationOptions: IPaginationOptions) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const response = await Legal.find()
    .select(["-__v", "-steps"])
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder as "asc" | "desc" });

  const total = await Legal.countDocuments();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: response,
  };
};

const findOne = async (_id: ObjectId) => {
  const response = await Legal.findById(_id).select(["-__v"]).populate("steps");
  return response;
};

const create = async (data: ILegal): Promise<ILegal> => {
  const result = await Legal.create(data);
  return result;
};

const updateOne = async (
  data: ILegal,
  id: ObjectId
): Promise<ILegal | null> => {
  const result = await Legal.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteOne = async (id: ObjectId): Promise<ILegal | null> => {
  const result = await Legal.findByIdAndDelete(id);
  return result;
};

export const LegalService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
};

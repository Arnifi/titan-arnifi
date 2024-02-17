import {
  IPaginationOptions,
  paginationHelpers,
} from "@/utils/server/helpers/paginationHelper";
import LegalDocument, { ILegalDocument } from "../legalDocument.model";
import { ObjectId } from "mongoose";

const findAll = async (paginationOptions: IPaginationOptions) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const response = await LegalDocument.find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder as "asc" | "desc" });

  const total = await LegalDocument.countDocuments();

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
  const response = await LegalDocument.findById(_id)
    .select(["-__v"])
    .populate({
      path: "steps",
      select: ["-__v", "-legalID", "-createdAt", "-updatedAt"],
      populate: {
        path: "fieldsBlocks",
        select: ["-__v", "-createdAt", "-updatedAt"],
        populate: {
          path: "fields",
          select: ["-__v", "-createdAt", "-updatedAt"],
        },
      },
    });

  return response;
};

const create = async (data: ILegalDocument): Promise<ILegalDocument> => {
  const result = await LegalDocument.create(data);
  return result;
};

const updateOne = async (
  data: ILegalDocument,
  id: ObjectId
): Promise<ILegalDocument | null> => {
  const { steps, ...others } = data || {};
  const result = await LegalDocument.findByIdAndUpdate(id, others, {
    new: true,
    runValidators: true,
  }).select(["-__v", "-steps"]);

  return result;
};

const deleteOne = async (id: ObjectId): Promise<ILegalDocument | null> => {
  const result = await LegalDocument.findByIdAndDelete(id);
  return result;
};

export const LegalService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
};

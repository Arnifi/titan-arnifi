import {
  IPaginationOptions,
  paginationHelpers,
} from "@/utils/server/helpers/paginationHelper";
import Legal, { ILegal } from "../legal.models";

const find = async (paginationOptions: IPaginationOptions) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const response = await Legal.find()
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
const create = async (data: ILegal): Promise<ILegal> => {
  const result = await Legal.create(data);
  return result;
};

export const LegalService = {
  find,
  create,
};

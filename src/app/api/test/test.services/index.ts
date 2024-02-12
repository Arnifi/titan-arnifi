import {
  IPaginationOptions,
  paginationHelpers,
} from "@/utils/server/helpers/paginationHelper";
import ApiTest, { IApiTest } from "../test.models";

const find = async (paginationOptions: IPaginationOptions) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const response = await ApiTest.find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder as "asc" | "desc" });

  const total = await ApiTest.countDocuments();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: response,
  };
};
const create = async (data: IApiTest): Promise<IApiTest> => {
  const result = await ApiTest.create(data);
  return result;
};

export const TestService = {
  find,
  create,
};

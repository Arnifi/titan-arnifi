import catchAsync from "@/utils/helpers/catchAsync";
import sendResponse from "@/utils/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import { FieldBlockService } from "./fieldsBlock.service";
import ApiError from "@/utils/ErrorHandelars/ApiError";
import pick from "@/utils/Pick";
import {
  IFieldsBlock,
  IFieldsBlockFilters,
  fieldBlocksFilterableFields,
} from "./fieldsBlock.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const filtersOptions: IFieldsBlockFilters = pick(
      req.url,
      fieldBlocksFilterableFields
    );

    const response = await FieldBlockService.findAll(filtersOptions);

    return sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Fields Blocks Get Successfully",
      data: response,
    });
  }
);

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data: IFieldsBlock = await req.json();
    const isExists = await FieldBlockService.isExists(data);

    if (isExists?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Fields Block Already Exists");
    }

    const response = await FieldBlockService.create(data);

    return sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Fields Block Create Successfully",
      data: response,
    });
  }
);

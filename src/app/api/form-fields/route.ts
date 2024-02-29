import catchAsync from "@/utils/server/helpers/catchAsync";
import sendResponse from "@/utils/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import ApiError from "@/utils/server/ErrorHandelars/ApiError";
import { FormFieldService } from "./formField.service";
import {
  IFormField,
  IFormFieldFilters,
  formFieldsFilterableFields,
} from "./formField.model";
import pick from "@/utils/server/Pick";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const filtersOptions: IFormFieldFilters = pick(
      req.url,
      formFieldsFilterableFields
    );

    const response = await FormFieldService.findAll(filtersOptions);

    return sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Form Fields Get Successfully",
      data: response,
    });
  }
);

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data: IFormField = await req.json();
    const isExists = await FormFieldService.isExists(data);

    if (isExists?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Form Field Already Exists");
    }

    const response = await FormFieldService.create(data);

    return sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Form Field Create Successfully",
      data: response,
    });
  }
);

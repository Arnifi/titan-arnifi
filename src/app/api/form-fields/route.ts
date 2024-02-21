import catchAsync from "@/utils/server/helpers/catchAsync";
import sendResponse from "@/utils/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import { FormFieldService } from "./formField.service";
import ApiError from "@/utils/server/ErrorHandelars/ApiError";
import { IFormField } from "./formField.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const response = await FormFieldService.findAll();

    return sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Form Input Fields Get Successfully",
      data: response,
    });
  }
);

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data: IFormField = await req.json();
    const isExists = await FormFieldService.isExists(data);

    if (isExists?.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Form Input Field Already Exists"
      );
    }

    const response = await FormFieldService.create(data);

    return sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Form Input Field Create Successfully",
      data: response,
    });
  }
);

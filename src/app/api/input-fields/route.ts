import catchAsync from "@/utils/server/helpers/catchAsync";
import sendResponse from "@/utils/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import { InputFieldService } from "./inputField.service";
import ApiError from "@/utils/server/ErrorHandelars/ApiError";
import { IInputField } from "./inputField.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const response = await InputFieldService.findAll();

    return sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Form Steps Get Successfully",
      data: response,
    });
  }
);

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data: IInputField = await req.json();
    const isExists = await InputFieldService.isExists(data);

    if (isExists?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Form Step Already Exists");
    }

    const response = await InputFieldService.create(data);

    return sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Form Step Create Successfully",
      data: response,
    });
  }
);

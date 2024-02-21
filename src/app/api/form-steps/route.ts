import catchAsync from "@/utils/server/helpers/catchAsync";
import sendResponse from "@/utils/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import { FormStepService } from "./formStep.service";
import ApiError from "@/utils/server/ErrorHandelars/ApiError";
import { IFormStep } from "./formStep.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const response = await FormStepService.findAll();

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
    const data: IFormStep = await req.json();
    const isExists = await FormStepService.isExists(data);

    if (isExists?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Form Step Already Exists");
    }

    const response = await FormStepService.create(data);

    return sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Form Step Create Successfully",
      data: response,
    });
  }
);

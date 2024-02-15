import catchAsync from "@/utils/server/helpers/catchAsync";
import sendResponse from "@/utils/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import { FormStepService } from "./formStep.service";
import { IFormStep } from "./formStep.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const response = await FormStepService.findAll();

    return sendResponse<IFormStep[]>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Form Steps Get Successfully",
      data: response,
    });
  }
);

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data = await req.json();
    const response = await FormStepService.create(data);

    return await sendResponse<IFormStep>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Form Step Create Successfully",
      data: response,
    });
  }
);

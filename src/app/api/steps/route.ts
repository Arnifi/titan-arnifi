import catchAsync from "@/utils/server/helpers/catchAsync";
import sendResponse from "@/utils/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import { StepService } from "./steps.services";
import { IStep } from "./steps.models";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const response = await StepService.findAll();

    return sendResponse<IStep[]>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Legal Steps Get Successfully",
      data: response,
    });
  }
);

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data = await req.json();
    const response = await StepService.create(data);

    return await sendResponse<IStep>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Legal Step Create Successfully",
      data: response,
    });
  }
);

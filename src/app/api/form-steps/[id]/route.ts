import catchAsync from "@/utils/server/helpers/catchAsync";
import { NextResponse } from "next/server";
import httpStatus from "http-status";
import { ObjectId } from "mongoose";
import sendResponse from "@/utils/server/helpers/sendResponse";
import { FormStepService } from "../formStep.service";
import { IFormStep } from "../formStep.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await FormStepService.findOne(id as unknown as ObjectId);

    return await sendResponse<IFormStep>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Form Step Get Successfully",
      data: response,
    });
  }
);

export const PATCH = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const data = await req.json();
    const response = await FormStepService.updateOne(
      data,
      id as unknown as ObjectId
    );

    return await sendResponse<IFormStep | null>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Form Step Update Successfully",
      data: response,
    });
  }
);

export const DELETE = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await FormStepService.deleteOne(id as unknown as ObjectId);

    return await sendResponse<IFormStep | null>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Form Step Delete Successfully",
      data: response,
    });
  }
);

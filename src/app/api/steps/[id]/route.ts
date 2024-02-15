import catchAsync from "@/utils/server/helpers/catchAsync";
import { NextResponse } from "next/server";
import httpStatus from "http-status";
import { ObjectId } from "mongoose";
import sendResponse from "@/utils/server/helpers/sendResponse";
import { StepService } from "../steps.services";
import { IStep } from "../steps.models";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await StepService.findOne(id as unknown as ObjectId);

    return await sendResponse<IStep>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Legal Step Get Successfully",
      data: response,
    });
  }
);

export const PATCH = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const data = await req.json();
    const response = await StepService.updateOne(
      data,
      id as unknown as ObjectId
    );

    return await sendResponse<IStep | null>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Legal Step Update Successfully",
      data: response,
    });
  }
);

export const DELETE = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await StepService.deleteOne(id as unknown as ObjectId);

    return await sendResponse<IStep | null>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Legal Delete Successfully",
      data: response,
    });
  }
);

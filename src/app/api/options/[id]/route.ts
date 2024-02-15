import catchAsync from "@/utils/server/helpers/catchAsync";
import { NextResponse } from "next/server";
import httpStatus from "http-status";
import { ObjectId } from "mongoose";
import sendResponse from "@/utils/server/helpers/sendResponse";
import { OptionService } from "../option.service";
import { IOption } from "../option.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await OptionService.findOne(id as unknown as ObjectId);

    return await sendResponse<IOption>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Field Option Get Successfully",
      data: response,
    });
  }
);

export const PATCH = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const data = await req.json();
    const response = await OptionService.updateOne(
      data,
      id as unknown as ObjectId
    );

    return await sendResponse<IOption | null>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Field Option Update Successfully",
      data: response,
    });
  }
);

export const DELETE = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await OptionService.deleteOne(id as unknown as ObjectId);

    return await sendResponse<IOption | null>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Field Option Delete Successfully",
      data: response,
    });
  }
);

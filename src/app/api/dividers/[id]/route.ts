import catchAsync from "@/utils/server/helpers/catchAsync";
import { NextResponse } from "next/server";
import httpStatus from "http-status";
import { ObjectId } from "mongoose";
import sendResponse from "@/utils/server/helpers/sendResponse";
import { IDivider } from "../divider.model";
import { DividerService } from "../divider.service";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await DividerService.findOne(id as unknown as ObjectId);

    return await sendResponse<IDivider>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Step Divider Get Successfully",
      data: response,
    });
  }
);

export const PATCH = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const data = await req.json();
    const response = await DividerService.updateOne(
      data,
      id as unknown as ObjectId
    );

    return await sendResponse<IDivider | null>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Step Divider Update Successfully",
      data: response,
    });
  }
);

export const DELETE = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await DividerService.deleteOne(id as unknown as ObjectId);

    return await sendResponse<IDivider | null>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Step Divider Delete Successfully",
      data: response,
    });
  }
);

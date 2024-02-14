import catchAsync from "@/utils/server/helpers/catchAsync";
import { NextResponse } from "next/server";
import httpStatus from "http-status";
import { ObjectId } from "mongoose";
import sendResponse from "@/utils/server/helpers/sendResponse";
import { FieldService } from "../field.service";
import { IField } from "../field.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await FieldService.findOne(id as unknown as ObjectId);

    return await sendResponse<IField>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Step Field Get Successfully",
      data: response,
    });
  }
);

export const PATCH = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const data = await req.json();
    const response = await FieldService.updateOne(
      data,
      id as unknown as ObjectId
    );

    return await sendResponse<IField | null>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Step Field Update Successfully",
      data: response,
    });
  }
);

export const DELETE = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await FieldService.deleteOne(id as unknown as ObjectId);

    return await sendResponse<IField | null>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Step Field Delete Successfully",
      data: response,
    });
  }
);

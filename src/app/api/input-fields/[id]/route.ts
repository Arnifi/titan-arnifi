import catchAsync from "@/utils/server/helpers/catchAsync";
import { NextResponse } from "next/server";
import httpStatus from "http-status";
import { ObjectId } from "mongoose";
import sendResponse from "@/utils/server/helpers/sendResponse";
import { InputFieldService } from "../field.service";
import { IInputField } from "../field.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await InputFieldService.findOne(id as unknown as ObjectId);

    return await sendResponse<IInputField>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Input Fields Get Successfully",
      data: response,
    });
  }
);

export const PATCH = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const data = await req.json();
    const response = await InputFieldService.updateOne(
      data,
      id as unknown as ObjectId
    );

    return await sendResponse<IInputField | null>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Input Field Update Successfully",
      data: response,
    });
  }
);

export const DELETE = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await InputFieldService.deleteOne(
      id as unknown as ObjectId
    );

    return await sendResponse<IInputField | null>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Input Field Delete Successfully",
      data: response,
    });
  }
);

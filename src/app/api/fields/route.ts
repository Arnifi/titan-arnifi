import catchAsync from "@/utils/server/helpers/catchAsync";
import sendResponse from "@/utils/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import { FieldService } from "./field.service";
import { IField } from "./field.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const response = await FieldService.findAll();

    return sendResponse<IField[]>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Steps Fields Get Successfully",
      data: response,
    });
  }
);

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data = await req.json();
    const response = await FieldService.create(data);

    return await sendResponse<IField>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Step Field Create Successfully",
      data: response,
    });
  }
);

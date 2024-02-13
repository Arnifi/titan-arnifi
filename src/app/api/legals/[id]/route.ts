import catchAsync from "@/utils/server/helpers/catchAsync";
import { NextResponse } from "next/server";
import { LegalService } from "../legal.services";
import { ILegal } from "../legal.models";
import httpStatus from "http-status";
import { ObjectId } from "mongoose";
import sendResponse from "@/utils/server/helpers/sendResponse";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await LegalService.findOne(id as unknown as ObjectId);

    return await sendResponse<ILegal>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Legal Get Successfully",
      data: response,
    });
  }
);

export const PATCH = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const data = await req.json();
    const response = await LegalService.updateOne(
      data,
      id as unknown as ObjectId
    );

    return await sendResponse<ILegal | null>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Legal Update Successfully",
      data: response,
    });
  }
);

export const DELETE = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await LegalService.deleteOne(id as unknown as ObjectId);

    return await sendResponse<ILegal | null>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Legal Delete Successfully",
      data: response,
    });
  }
);

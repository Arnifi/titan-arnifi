import catchAsync from "@/utils/server/helpers/catchAsync";
import { NextResponse } from "next/server";
import httpStatus from "http-status";
import { ObjectId } from "mongoose";
import sendResponse from "@/utils/server/helpers/sendResponse";
import { ContentService } from "../content.service";
import { IContent } from "../content.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await ContentService.findOne(id as unknown as ObjectId);

    return await sendResponse<IContent>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Step Content Get Successfully",
      data: response,
    });
  }
);

export const PATCH = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const data = await req.json();
    const response = await ContentService.updateOne(
      data,
      id as unknown as ObjectId
    );

    return await sendResponse<IContent | null>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Step Content Update Successfully",
      data: response,
    });
  }
);

export const DELETE = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await ContentService.deleteOne(id as unknown as ObjectId);

    return await sendResponse<IContent | null>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Step Content Delete Successfully",
      data: response,
    });
  }
);

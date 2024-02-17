import catchAsync from "@/utils/server/helpers/catchAsync";
import { NextResponse } from "next/server";
import httpStatus from "http-status";
import { ObjectId } from "mongoose";
import sendResponse from "@/utils/server/helpers/sendResponse";
import { FieldBlockService } from "../fieldsBlock.service";
import { IFieldBlock } from "../fieldsBlock.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await FieldBlockService.findOne(id as unknown as ObjectId);

    return await sendResponse<IFieldBlock>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Fields Block Get Successfully",
      data: response,
    });
  }
);

export const PATCH = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const data = await req.json();
    const response = await FieldBlockService.updateOne(
      data,
      id as unknown as ObjectId
    );

    return await sendResponse<IFieldBlock | null>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Fields Block Update Successfully",
      data: response,
    });
  }
);

export const DELETE = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await FieldBlockService.deleteOne(
      id as unknown as ObjectId
    );

    return await sendResponse<IFieldBlock | null>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Fields Block Delete Successfully",
      data: response,
    });
  }
);

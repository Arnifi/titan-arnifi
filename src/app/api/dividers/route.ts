import catchAsync from "@/utils/server/helpers/catchAsync";
import sendResponse from "@/utils/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import { DividerService } from "./divider.service";
import { IDivider } from "./divider.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const response = await DividerService.findAll();

    return sendResponse<IDivider[]>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Steps Dividers Get Successfully",
      data: response,
    });
  }
);

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data = await req.json();
    const response = await DividerService.create(data);

    return await sendResponse<IDivider>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Step Divider Create Successfully",
      data: response,
    });
  }
);

import catchAsync from "@/utils/server/helpers/catchAsync";
import sendResponse from "@/utils/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import { ContentService } from "./content.service";
import { IContent } from "./content.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const response = await ContentService.findAll();

    return sendResponse<IContent[]>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Steps Contents Get Successfully",
      data: response,
    });
  }
);

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data = await req.json();
    const response = await ContentService.create(data);

    return await sendResponse<IContent>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Step Content Create Successfully",
      data: response,
    });
  }
);

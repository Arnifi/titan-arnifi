import catchAsync from "@/utils/helpers/catchAsync";
import sendResponse from "@/utils/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import { TemplateService } from "./templates.service";
import { ITemplate } from "./templates.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const response = await TemplateService.findAll();

    return sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Templates Get Successfully",
      data: response,
    });
  }
);

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data: ITemplate = await req.json();

    const response = await TemplateService.create(data);

    return sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Template Create Successfully",
      data: response,
    });
  }
);

import catchAsync from "@/utils/server/helpers/catchAsync";
import sendResponse from "@/utils/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import { InputFieldService } from "./inputField.service";
import { IInputField } from "./inputField.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const response = await InputFieldService.findAll();

    return sendResponse<IInputField[]>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Input Fields Get Successfully",
      data: response,
    });
  }
);

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data = await req.json();
    const response = await InputFieldService.create(data);

    return await sendResponse<IInputField>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Input Field Create Successfully",
      data: response,
    });
  }
);

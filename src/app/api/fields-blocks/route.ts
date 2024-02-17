import catchAsync from "@/utils/server/helpers/catchAsync";
import sendResponse from "@/utils/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import { FieldBlockService } from "./fieldsBlock.service";
import { IFieldsBlock } from "./fieldsBlock.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const response = await FieldBlockService.findAll();

    return sendResponse<IFieldsBlock[]>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Fields Blocks Get Successfully",
      data: response,
    });
  }
);

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data = await req.json();
    const response = await FieldBlockService.create(data);

    return await sendResponse<IFieldsBlock>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Fields Block Create Successfully",
      data: response,
    });
  }
);

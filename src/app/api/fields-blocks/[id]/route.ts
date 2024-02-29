import catchAsync from "@/utils/server/helpers/catchAsync";
import { NextResponse } from "next/server";
import httpStatus from "http-status";
import sendResponse from "@/utils/server/helpers/sendResponse";
import ApiError from "@/utils/server/ErrorHandelars/ApiError";
import { FieldBlockService } from "../fieldsBlock.service";
import { IFieldsBlock } from "../fieldsBlock.model";
import { IFormStep } from "../../form-steps/formStep.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await FieldBlockService.findOne(id as string);

    return await sendResponse({
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
    const data: IFieldsBlock = await req.json();

    const isExists = await FieldBlockService.findOne(id as string);

    if (!isExists?.id) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Fields Blcok Not Found");
    }
    const response = await FieldBlockService.updateOne(id as string, data);

    return await sendResponse({
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

    const isExists = await FieldBlockService.findOne(id as string);

    if (!isExists?.id) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Form Step Not Found");
    }

    if (isExists?.fields?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Fields Block Has Fields");
    }

    await FieldBlockService.deleteOne(
      id as string,
      isExists?.step as IFormStep
    );

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Fields Block Delete Successfully",
      data: isExists,
    });
  }
);

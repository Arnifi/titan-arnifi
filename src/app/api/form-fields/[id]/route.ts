import catchAsync from "@/utils/server/helpers/catchAsync";
import { NextResponse } from "next/server";
import httpStatus from "http-status";
import sendResponse from "@/utils/server/helpers/sendResponse";
import ApiError from "@/utils/server/ErrorHandelars/ApiError";
import { FormFieldService } from "../formField.service";
import { IFieldsBlock } from "../../fields-blocks/fieldsBlock.model";
import { IFormField } from "../formField.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await FormFieldService.findOne(id as string);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Form Field Get Successfully",
      data: response,
    });
  }
);

export const PATCH = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const data: IFormField = await req.json();

    const isExists = await FormFieldService.findOne(id as string);

    if (!isExists?.id) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Form Field Not Found");
    }
    const response = await FormFieldService.updateOne(id as string, data);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Form Field Update Successfully",
      data: response,
    });
  }
);

export const DELETE = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();

    const isExists = await FormFieldService.findOne(id as string);

    if (!isExists?.id) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Form Field Not Found");
    }

    await FormFieldService.deleteOne(
      id as string,
      isExists?.block as IFieldsBlock
    );

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Form Field Delete Successfully",
      data: isExists,
    });
  }
);

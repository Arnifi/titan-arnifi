import catchAsync from "@/utils/server/helpers/catchAsync";
import sendResponse from "@/utils/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import { OptionService } from "./option.service";
import { IOption } from "./option.model";
import { FieldService } from "../fields/field.service";
import { IFieldType } from "../fields/field.model";
import ApiError from "@/utils/server/ErrorHandelars/ApiError";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const response = await OptionService.findAll();

    return sendResponse<IOption[]>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Field Options Get Successfully",
      data: response,
    });
  }
);

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data = await req.json();
    const { fieldID } = data;

    const field = await FieldService.findOne(fieldID);

    if (field?.type !== IFieldType.SELECT && field?.type !== IFieldType.RADIO) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Field type must be select or radio"
      );
    }

    const response = await OptionService.create(data);

    return await sendResponse<IOption>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Field Option Create Successfully",
      data: response,
    });
  }
);

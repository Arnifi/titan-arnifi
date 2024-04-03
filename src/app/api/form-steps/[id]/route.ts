import catchAsync from "@/utils/helpers/catchAsync";
import { NextResponse } from "next/server";
import httpStatus from "http-status";
import sendResponse from "@/utils/helpers/sendResponse";
import ApiError from "@/utils/ErrorHandelars/ApiError";
import { FormStepService } from "../formStep.service";
import { IFormStep } from "../formStep.model";
import { ILegalDocument } from "../../legal-documents/legalDocument.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await FormStepService.findOne(id as string);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Form Step Get Successfully",
      data: response,
    });
  }
);

export const PATCH = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const data: IFormStep = await req.json();

    const isExists = await FormStepService.findOne(id as string);

    if (!isExists?.id) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Form Step Not Found");
    }
    const response = await FormStepService.updateOne(id as string, data);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Form Step Update Successfully",
      data: response,
    });
  }
);

export const DELETE = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();

    const isExists = await FormStepService.findOne(id as string);

    if (!isExists?.id) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Form Step Not Found");
    }

    if (isExists?.blocks?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Form Step Has Fields");
    }

    await FormStepService.deleteOne(
      id as string,
      isExists?.legalDocument as ILegalDocument
    );

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Form Step Delete Successfully",
      data: isExists,
    });
  }
);

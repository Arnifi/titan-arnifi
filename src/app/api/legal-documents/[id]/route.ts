import catchAsync from "@/utils/helpers/catchAsync";
import { NextResponse } from "next/server";
import httpStatus from "http-status";
import sendResponse from "@/utils/helpers/sendResponse";
import { LegalDocumentService } from "../legalDocument.service";
import { ILegalDocument } from "../legalDocument.model";
import ApiError from "@/utils/ErrorHandelars/ApiError";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await LegalDocumentService.findOne(id as string);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Legal Document Get Successfully",
      data: response,
    });
  }
);

export const PATCH = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const data: ILegalDocument = await req.json();

    const isExists = await LegalDocumentService.findOne(id as string);

    if (!isExists?.id) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Legal Document Not Found");
    }

    const response = await LegalDocumentService.updateOne(id as string, data);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Legal Document Update Successfully",
      data: response,
    });
  }
);

export const DELETE = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();

    const isExists = await LegalDocumentService.findOne(id as string);
    if (!isExists?.id) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Legal Document Not Found");
    }

    if (isExists?.steps?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Legal Document Has Steps");
    }

    await LegalDocumentService.deleteOne(id as string);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Legal Document Delete Successfully",
      data: isExists,
    });
  }
);

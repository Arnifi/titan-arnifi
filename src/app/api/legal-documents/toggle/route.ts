import catchAsync from "@/utils/server/helpers/catchAsync";
import sendResponse from "@/utils/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import Legal_Documents, { ILegalDocument } from "../legalDocument.model";
import Templates from "../../templates/templates.model";
import ApiError from "@/utils/server/ErrorHandelars/ApiError";

export const PATCH = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data: ILegalDocument = await req.json();

    const isTemplate = await Templates.scan({
      document: data?.id,
    }).exec();

    if (isTemplate.toJSON().length <= 0) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Template not found for this Document"
      );
    }

    const response = await Legal_Documents.update(
      { id: data?.id },
      {
        status: !data?.status,
      }
    );

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Legal Document Status Toggle Successfully",
      data: response,
    });
  }
);

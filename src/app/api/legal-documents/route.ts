import catchAsync from "@/utils/helpers/catchAsync";
import sendResponse from "@/utils/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import { LegalDocumentService } from "./legalDocument.service";
import {
  ILegalDocument,
  ILegalsFilters,
  legalsFilterableFields,
} from "./legalDocument.model";
import ApiError from "@/utils/ErrorHandelars/ApiError";
import pick from "@/utils/Pick";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const filtersOptions: ILegalsFilters = pick(
      req.url,
      legalsFilterableFields
    );
    console.log("route call");
    const response = await LegalDocumentService.findAll(filtersOptions);

    return sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Legals Documents Get Successfully",
      data: response,
    });
  }
);

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data: ILegalDocument = await req.json();
    const isExists = await LegalDocumentService.isExists(data);
    if (isExists?.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Legal Document Already Exists"
      );
    }

    const response = await LegalDocumentService.create(data);

    return sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Legals Documents Create Successfully",
      data: response,
    });
  }
);

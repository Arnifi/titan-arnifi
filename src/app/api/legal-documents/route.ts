import catchAsync from "@/utils/server/helpers/catchAsync";
import sendResponse from "@/utils/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import pick from "@/utils/server/Pick";
import { paginationFields } from "@/utils/server/helpers/paginationHelper";
import { ILegalDocument } from "./legalDocument.model";
import { LegalService } from "./legalDocument.service";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const paginationOptions = pick(req.url, paginationFields);
    const response = await LegalService.findAll(paginationOptions);

    return sendResponse<ILegalDocument[]>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Legal Documents Get Successfully",
      meta: response.meta,
      data: response.data,
    });
  }
);

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data = await req.json();
    const response = await LegalService.create(data);

    return await sendResponse<ILegalDocument>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Legal Document Create Successfully",
      data: response,
    });
  }
);

import catchAsync from "@/utils/server/helpers/catchAsync";
import sendResponse from "@/utils/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import { LegalDocumentService } from "./legalDocument.service";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const response = await LegalDocumentService.findAll();

    return sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Legals Documents Get Successfully",
      data: response,
    });
  }
);

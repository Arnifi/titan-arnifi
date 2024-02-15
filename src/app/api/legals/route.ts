import catchAsync from "@/utils/server/helpers/catchAsync";
import sendResponse from "@/utils/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import pick from "@/utils/server/Pick";
import { paginationFields } from "@/utils/server/helpers/paginationHelper";
import { ILegal } from "./legal.models";
import { LegalService } from "./legal.services";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const paginationOptions = pick(req.url, paginationFields);
    const response = await LegalService.findAll(paginationOptions);

    return sendResponse<ILegal[]>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Legals Get Successfully",
      meta: response.meta,
      data: response.data,
    });
  }
);

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data = await req.json();
    const response = await LegalService.create(data);

    return await sendResponse<ILegal>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Legal Create Successfully",
      data: response,
    });
  }
);

import catchAsync from "@/utils/server/helpers/catchAsync";
import sendResponse from "@/utils/server/helpers/sendResponse";
import httpStatus from "http-status";
import { TestService } from "./test.services";
import { NextResponse } from "next/server";
import { IApiTest } from "./test.models";
import pick from "@/utils/server/Pick";
import { paginationFields } from "@/utils/server/helpers/paginationHelper";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const paginationOptions = pick(req.url, paginationFields);

    const response = await TestService.find(paginationOptions);

    return sendResponse<IApiTest[]>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Test data Get Successfully",
      meta: response.meta,
      data: response.data,
    });
  }
);

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data = await req.json();
    const response = await TestService.create(data);

    return await sendResponse<IApiTest>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Test data Create Successfully",
      data: response,
    });
  }
);

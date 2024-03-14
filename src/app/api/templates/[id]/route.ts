import catchAsync from "@/utils/server/helpers/catchAsync";
import { NextResponse } from "next/server";
import httpStatus from "http-status";
import sendResponse from "@/utils/server/helpers/sendResponse";
import { TemplateService } from "../templates.service";
import { ITemplate } from "../templates.model";
import { LegalDocumentService } from "../../legal-documents/legalDocument.service";
import generateTemplate from "@/utils/client/generateTemplate";
import Legal_Documents, {
  ILegalDocument,
} from "../../legal-documents/legalDocument.model";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const response = await TemplateService.findOne(id as string);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Template Get Successfully",
      data: response,
    });
  }
);

export const PATCH = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const data: ITemplate = await req.json();

    const response = await TemplateService.updateOne(id as string, data);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Template Update Successfully",
      data: response,
    });
  }
);

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const id = req.url.split("/").pop();
    const data = await req.json();

    const document = await (
      await LegalDocumentService.findOne(id as string)
    ).toJSON();
    const htmlTemp = generateTemplate(document as ILegalDocument, data);

    await Legal_Documents.update(
      { id },
      {
        downloadCount: document?.downloadCount + 1,
      }
    );

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Document Template Generated Successfully",
      data: htmlTemp,
    });
  }
);

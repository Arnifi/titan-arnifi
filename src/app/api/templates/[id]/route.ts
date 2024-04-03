import catchAsync from "@/utils/helpers/catchAsync";
import { NextRequest, NextResponse } from "next/server";
import httpStatus from "http-status";
import sendResponse from "@/utils/helpers/sendResponse";
import { TemplateService } from "../templates.service";
import { ITemplate } from "../templates.model";
import { LegalDocumentService } from "../../legal-documents/legalDocument.service";
import generateTemplate from "@/utils/generateTemplate";
import Legal_Documents, {
  ILegalDocument,
} from "../../legal-documents/legalDocument.model";
import ApiError from "@/utils/ErrorHandelars/ApiError";

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

export const POST = async (req: NextRequest, res: NextResponse) => {
  const id = req.url.split("/").pop() as string;
  const data = await req.json();

  const { formet, ...values } = data;

  try {
    const document = await (
      await LegalDocumentService.findOne(id as string)
    ).toJSON();

    const htmlTemp = generateTemplate(document as ILegalDocument, values);

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

    // const pdfHeader = {
    //   "content-type": "application/pdf",
    //   "content-disposition": `attachment; filename="test.pdf"`,
    // };

    // const docxHeader = {
    //   "content-type":
    //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //   "content-disposition": `attachment; filename="test.docx"`,
    // };

    // let fileBuffer = null;

    // if (formet === "pdf") {
    //   fileBuffer = await generatePdfBuffer(htmlTemp);
    // } else if (formet === "docx") {
    //   fileBuffer = await generateDocBuffer(htmlTemp);
    // } else {
    //   fileBuffer = null;
    // }

    // const response = new NextResponse(fileBuffer, {
    //   status: 200,
    //   headers: formet === "pdf" ? pdfHeader : docxHeader,
    // });

    // return response;
  } catch (error) {
    console.log("error", error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong"
    );
  }
};

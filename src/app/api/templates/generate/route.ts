import catchAsync from "@/utils/server/helpers/catchAsync";
import sendResponse from "@/utils/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";
import { LegalDocumentService } from "../../legal-documents/legalDocument.service";
import generateTemplate from "@/utils/client/generateTemplate";
import Legal_Documents, {
  ILegalDocument,
} from "../../legal-documents/legalDocument.model";

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const { id, ...other } = await req.json();

    const document = await (await LegalDocumentService.findOne(id)).toJSON();
    const htmlTemp = generateTemplate(document as ILegalDocument, other);

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

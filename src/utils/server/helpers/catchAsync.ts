import dbConnection from "../../../lib/dbConnection";
import { NextResponse } from "next/server";

const catchAsync =
  (handler: (req: Request, res: Response) => void) =>
  async (req: Request, res: Response) => {
    await dbConnection();
    try {
      return await handler(req, res);
    } catch (error) {
      return NextResponse.json({
        statusCode: 500,
        success: false,
        message: "Something went wrong",
        error: error,
      });
    }
  };

export default catchAsync;

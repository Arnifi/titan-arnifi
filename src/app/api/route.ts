import dbConnection from "@/lib/dbConnection";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  await dbConnection();

  return NextResponse.json({
    message: "Api working...",
  });
};

export const POST = async (req: Request, res: Response) => {
  await dbConnection();
};

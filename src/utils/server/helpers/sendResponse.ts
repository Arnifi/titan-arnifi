import { NextResponse } from "next/server";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IApiReponse<T> {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: IMeta;
  data?: T | null;
}

const sendResponse = <T>(
  data: IApiReponse<T>
): Promise<NextResponse<IApiReponse<T>>> => {
  const responseData: IApiReponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null,
  };

  return Promise.resolve(NextResponse.json(responseData));
};

export default sendResponse;

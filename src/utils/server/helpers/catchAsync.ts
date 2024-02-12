import dbConnection from "../../../lib/dbConnection";
import globalErrorHandler from "../ErrorHandelars/GlobalErrorHandelar";

const catchAsync =
  (handler: (req: Request, res: Response) => void) =>
  async (req: Request, res: Response) => {
    await dbConnection();
    try {
      return await handler(req, res);
    } catch (error) {
      return globalErrorHandler(error as Error);
    }
  };

export default catchAsync;

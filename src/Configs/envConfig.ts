console.log(
  "AWS_ACCESS_KEY_ID",
  AWS_ACCESS_KEY_ID,
  "AWS_SECRET_ACCESS_KEY",
  AWS_SECRET_ACCESS_KEY
);
const envConfig = {
  environment: process.env.ENVIRONMENT,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  region: process.env.AWS_REGION as string,
  backendBaseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
};

export default envConfig;

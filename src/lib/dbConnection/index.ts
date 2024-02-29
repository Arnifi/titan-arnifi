import envConfig from "../../Configs/envConfig";
import dynamoose from "dynamoose";

const dbConnection = async () => {
  console.log("Initializing database connection...");
  try {
    const ddb = new dynamoose.aws.ddb.DynamoDB({
      credentials: {
        accessKeyId: envConfig.accessKeyId,
        secretAccessKey: envConfig.secretAccessKey,
      },
      region: envConfig.region,
    });
    dynamoose.aws.ddb.set(ddb);
    console.log("Database connection established successfully");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

export default dbConnection;

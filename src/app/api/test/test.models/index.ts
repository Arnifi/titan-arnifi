import { Document, model, Model, models, Schema } from "mongoose";

export interface IApiTest extends Document {
  title: string;
}

const apiTestSchema: Schema<IApiTest> = new Schema<IApiTest>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ApiTest: Model<IApiTest> =
  (models.Api_Test as Model<IApiTest>) ||
  model<IApiTest>("Api_Test", apiTestSchema);

export default ApiTest;

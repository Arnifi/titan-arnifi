import { Document, model, Model, models, Schema } from "mongoose";

export interface IContent extends Document {
  stepID: Schema.Types.ObjectId;
  heading: string;
  subHeading: string[];
}

const contentSchema: Schema<IContent> = new Schema<IContent>(
  {
    stepID: {
      type: Schema.Types.ObjectId,
      ref: "Step",
      required: true,
      lowercase: true,
      trim: true,
    },
    heading: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    subHeading: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Content: Model<IContent> =
  (models.Content as Model<IContent>) ||
  model<IContent>("Content", contentSchema);

export default Content;

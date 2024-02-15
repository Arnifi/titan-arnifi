import { Document, model, Model, models, ObjectId, Schema } from "mongoose";

export enum StepType {
  Single = "single",
  Multiple = "multiple",
}

export interface IStep extends Document {
  legalID: ObjectId;
  type: StepType;
  label: string;
}

const stepSchema: Schema<IStep> = new Schema<IStep>(
  {
    legalID: {
      type: Schema.Types.ObjectId,
      ref: "Legal",
      required: true,
    },

    type: {
      type: String,
      enum: Object.values(StepType),
      required: true,
    },

    label: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Step: Model<IStep> =
  (models.Step as Model<IStep>) || model<IStep>("Step", stepSchema);

export default Step;

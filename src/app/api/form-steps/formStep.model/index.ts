import { Document, model, Model, models, ObjectId, Schema } from "mongoose";

export enum StepType {
  Single = "single",
  Multiple = "multiple",
}

export interface IFormStep extends Document {
  legalID: ObjectId;
  type: StepType;
  label: string;
  heading: string;
  description: string;
}

const formStepSchema: Schema<IFormStep> = new Schema<IFormStep>(
  {
    legalID: {
      type: Schema.Types.ObjectId,
      ref: "Legal_Document",
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

    heading: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const FormStep: Model<IFormStep> =
  (models.Form_Step as Model<IFormStep>) ||
  model<IFormStep>("Form_Step", formStepSchema);

export default FormStep;

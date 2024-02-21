import dynamoose from "dynamoose";
import { v4 as uuidv4 } from "uuid";
import { ModelType } from "dynamoose/dist/General";
import { AnyItem } from "dynamoose/dist/Item";
import Legal_Documents from "../../legal-documents/legalDocument.model";

export enum StepType {
  SINGLE = "single",
  MULTIPLE = "multiple",
}

export interface IFormStep extends Document {
  id: string;
  legalDocument: string;
  type: StepType;
  label: string;
  heading: string;
  description: string;
}

export const formStepSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: () => uuidv4(),
    },
    legalDocument: Legal_Documents,
    type: {
      type: String,
      enum: Object.values(StepType),
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    fields: {
      type: Array,
      schema: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Form_Steps: ModelType<AnyItem> = dynamoose.model(
  "Form_Steps",
  formStepSchema
);

export default Form_Steps;

import dynamoose from "dynamoose";
import { v4 as uuidv4 } from "uuid";
import { IFormStep } from "../../form-steps/formStep.model";

export enum LegalType {
  Will = "Will",
  Rental = "Rental",
  Agreement = "Agreement",
  Other = "Other",
}

export interface ILegalsFilters {
  [key: string]: string | undefined;
}

export const legalsFilterableFields: string[] = ["search", "type", "country"];

export interface ILegalDocument extends Document {
  id: string;
  title: string;
  country: string;
  type: LegalType;
  status: boolean;
  downloadCount: number;
  metaData: string;
  steps: IFormStep[] | string[];
}

const legalDocumentSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: () => uuidv4(),
    },

    title: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(LegalType),
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    metaData: {
      type: String,
    },
    steps: {
      type: Array,
      schema: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Legal_Documents = dynamoose.model("Legal_Documents", legalDocumentSchema);
export default Legal_Documents;

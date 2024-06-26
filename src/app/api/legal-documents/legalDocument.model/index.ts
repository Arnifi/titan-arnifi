import dynamoose from "dynamoose";
import { v4 as uuidv4 } from "uuid";
import { IFormStep } from "../../form-steps/formStep.model";
import { ITemplate } from "../../templates/templates.model";
import config from "../../../../config/index.json";

export enum LegalType {
  IndividualPersonal = "Individual/Personal",
  Business = "Business",
  RealEstate = "Real estate",
  Tax = "Tax",
  GovernmentForms = "Government forms",
  Other = "Other",
}

export const documentsTypes: string[] = [
  LegalType.IndividualPersonal,
  LegalType.Business,
  LegalType.RealEstate,
  LegalType.Tax,
  LegalType.GovernmentForms,
  LegalType.Other,
];

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
  requiredDocuments: string[];
  metaData: string;
  steps: IFormStep[] | string[];
  template: string | ITemplate;
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

    requiredDocuments: {
      type: Array,
      schema: [String],
      default: [],
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
    template: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Legal_Documents = dynamoose.model(
  config.Legal_Documents,
  legalDocumentSchema
);
export default Legal_Documents;

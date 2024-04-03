import dynamoose from "dynamoose";
import { v4 as uuidv4 } from "uuid";
import { ModelType } from "dynamoose/dist/General";
import { AnyItem } from "dynamoose/dist/Item";
import Legal_Documents, {
  ILegalDocument,
} from "../../legal-documents/legalDocument.model";
import { IFieldsBlock } from "../../fields-blocks/fieldsBlock.model";
import config from "../../../../config/index.json";

export const formStepsFilterableFields: string[] = ["documentId"];

export interface IFormStepsFilters {
  [key: string]: string | undefined;
}

export interface IFormStep extends Document {
  id: string;
  legalDocument: string | ILegalDocument;
  label: string;
  heading: string;
  description: string;
  blocks: string[] | IFieldsBlock[];
}

export const formStepSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: () => uuidv4(),
    },
    legalDocument: Legal_Documents,

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
    blocks: {
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
  config.Form_Steps,
  formStepSchema
);

export default Form_Steps;

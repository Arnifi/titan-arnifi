import dynamoose from "dynamoose";
import { v4 as uuidv4 } from "uuid";
import Legal_Documents, {
  ILegalDocument,
} from "../../legal-documents/legalDocument.model";

export interface ITemplate extends Document {
  id: string;
  document: string | ILegalDocument;
  htmlTemp: string;
}

const templateSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: () => uuidv4(),
    },

    document: Legal_Documents,
    htmlTemp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Templates = dynamoose.model("Templates", templateSchema);
export default Templates;

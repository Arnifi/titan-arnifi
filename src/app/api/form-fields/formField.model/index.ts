import dynamoose from "dynamoose";
import { v4 as uuidv4 } from "uuid";
import Form_Steps, { IFormStep } from "../../form-steps/formStep.model";

export enum IFieldType {
  TEXT = "text",
  NUMBER = "number",
  EMAIL = "email",
  DATE = "date",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  SELECT = "select",
  FILE = "file",
}

export interface IOption {
  label: string;
  value: string;
}

export interface IFormField extends Document {
  id: string;
  step: string | IFormStep;
  label: string;
  placeholder: string;
  type: IFieldType;
  name: string;
  required: boolean;
  isSearchable?: boolean;
  tooltip: string;
  options?: IOption[];
  width: number;
}

export const formFieldsSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: () => uuidv4(),
    },
    step: Form_Steps,

    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(IFieldType),
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    isSearchable: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      schema: [new dynamoose.Schema({ label: String, value: String })],
      default: [],
    },
    width: {
      type: Number,
      default: 6,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Form_Fields = dynamoose.model("Form_Fields", formFieldsSchema);

export default Form_Fields;

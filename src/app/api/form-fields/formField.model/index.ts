import dynamoose from "dynamoose";
import { v4 as uuidv4 } from "uuid";
import Fields_Block, {
  IFieldsBlock,
} from "../../fields-blocks/fieldsBlock.model";

export const formFieldsFilterableFields: string[] = ["blockId"];

export interface IFormFieldFilters {
  [key: string]: string | undefined;
}

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

export interface IFormField extends Document {
  id: string;
  block: string | IFieldsBlock;
  label: string;
  placeholder: string;
  type: IFieldType;
  isRequired: boolean;
  isCountriesOption?: boolean;
  isSearchable?: boolean;
  options?: string[];
  width: number;
}

export const formFieldsSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: () => uuidv4(),
    },
    block: Fields_Block,

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

    isRequired: {
      type: Boolean,
      default: false,
    },

    isCountriesOption: {
      type: Boolean,
      default: false,
    },

    isSearchable: {
      type: Boolean,
      default: false,
    },

    options: {
      type: Array,
      schema: [String],
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

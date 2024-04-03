import dynamoose from "dynamoose";
import { v4 as uuidv4 } from "uuid";
import { ModelType } from "dynamoose/dist/General";
import { AnyItem } from "dynamoose/dist/Item";
import Form_Steps, { IFormStep } from "../../form-steps/formStep.model";
import { IFormField } from "../../form-fields/formField.model";
import config from "../../../../config/index.json";

export enum BlockType {
  SINGLE = "Single",
  MULTIPLE = "Multiple",
}

export const fieldBlocksFilterableFields: string[] = ["stepId"];

export interface IFieldsBlockFilters {
  [key: string]: string | undefined;
}

export interface IFieldsBlock extends Document {
  id: string;
  step: string | IFormStep;
  type: BlockType;
  isShow: boolean;
  label: string;
  description: string;
  fields: string[] | IFormField[];
  createdAt: Date;
  updatedAt: Date;
}

export const fieldsBlockSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: () => uuidv4(),
    },
    step: Form_Steps,
    type: {
      type: String,
      enum: Object.values(BlockType),
      required: true,
    },
    label: {
      type: String,
      required: true,
    },

    isShow: {
      type: Boolean,
      default: false,
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

const Fields_Block: ModelType<AnyItem> = dynamoose.model(
  config.Fields_Block,
  fieldsBlockSchema
);

export default Fields_Block;

import { Document, model, Model, models, ObjectId, Schema } from "mongoose";

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

export interface IInputField extends Document {
  blockID: ObjectId;
  label: string;
  placeholder: string;
  type: IFieldType;
  name: string;
  required: boolean;
  isSearchable: boolean;
  tooltip?: string;
  options?: IOption[];
  width: number;
}

const inputFieldSchema: Schema<IInputField> = new Schema<IInputField>(
  {
    blockID: {
      type: Schema.Types.ObjectId,
      ref: "Fields_Block",
      required: true,
    },

    label: {
      type: String,
      default: "",
      trim: true,
    },

    placeholder: {
      type: String,
      default: "",
      trim: true,
    },

    type: {
      type: String,
      enum: Object.values(IFieldType),
      required: true,
    },

    isSearchable: {
      type: Boolean,
      default: false,
    },

    options: [
      {
        label: {
          type: String,
          required: true,
          trim: true,
        },
        value: {
          type: String,
          required: true,
          trim: true,
          loadClass: true,
        },
      },
    ],

    tooltip: {
      type: String,
      default: "",
    },

    width: {
      type: Number,
      default: 4,
      required: true,
      max: 12,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

const InputField: Model<IInputField> =
  (models.Input_Field as Model<IInputField>) ||
  model<IInputField>("Input_Field", inputFieldSchema);

export default InputField;

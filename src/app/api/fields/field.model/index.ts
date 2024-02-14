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

export interface IField extends Document {
  dividerID: ObjectId;
  label: string;
  placeholder: string;
  type: IFieldType;
  name: string;
  required: boolean;
  isSearchable: boolean;
  options?: ObjectId[];
}

const fieldSchema: Schema<IField> = new Schema<IField>(
  {
    dividerID: {
      type: Schema.Types.ObjectId,
      ref: "Divider",
      required: true,
    },

    label: {
      type: String,
      required: true,
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
    options: {
      type: [Schema.Types.ObjectId],
      ref: "Option",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Field: Model<IField> =
  (models.Field as Model<IField>) || model<IField>("Field", fieldSchema);

export default Field;

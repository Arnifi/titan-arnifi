import { Document, model, Model, models, ObjectId, Schema } from "mongoose";

export interface IOption extends Document {
  fieldID: ObjectId;
  label: string;
  value: string;
}

const optionSchema: Schema<IOption> = new Schema<IOption>(
  {
    fieldID: {
      type: Schema.Types.ObjectId,
      ref: "Field",
      required: true,
    },

    label: {
      type: String,
      required: true,
      trim: true,
    },

    value: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const Option: Model<IOption> =
  (models.Option as Model<IOption>) || model<IOption>("Option", optionSchema);

export default Option;

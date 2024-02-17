import { Document, model, Model, models, ObjectId, Schema } from "mongoose";

export interface IFieldsBlock extends Document {
  stepID: ObjectId;
  label: string;
  isShow: boolean;
  fields: ObjectId[];
}

const fieldBlockSchema: Schema<IFieldsBlock> = new Schema<IFieldsBlock>(
  {
    stepID: {
      type: Schema.Types.ObjectId,
      ref: "Form_Step",
      required: true,
    },

    label: {
      type: String,
      required: true,
      trim: true,
    },

    isShow: {
      type: Boolean,
      default: false,
    },

    fields: {
      type: [Schema.Types.ObjectId],
      ref: "Input_Field",
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const FieldsBlock: Model<IFieldsBlock> =
  (models.Fields_Block as Model<IFieldsBlock>) ||
  model<IFieldsBlock>("Fields_Block", fieldBlockSchema);

export default FieldsBlock;

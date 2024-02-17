import { Document, model, Model, models, ObjectId, Schema } from "mongoose";

export interface IFieldBlock extends Document {
  stepID: ObjectId;
  label: string;
  isShow: boolean;
  fields: ObjectId[];
}

const fieldBlockSchema: Schema<IFieldBlock> = new Schema<IFieldBlock>(
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

    fields: [
      {
        type: [Schema.Types.ObjectId],
        ref: "Input_Field",
        required: true,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const FieldBlock: Model<IFieldBlock> =
  (models.Fields_Block as Model<IFieldBlock>) ||
  model<IFieldBlock>("Fields_Block", fieldBlockSchema);

export default FieldBlock;

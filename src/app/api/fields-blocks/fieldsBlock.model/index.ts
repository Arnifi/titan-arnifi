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
      ref: "Step",
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
        ref: "Field",
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
  (models.FieldBlock as Model<IFieldBlock>) ||
  model<IFieldBlock>("FieldBlock", fieldBlockSchema);

export default FieldBlock;

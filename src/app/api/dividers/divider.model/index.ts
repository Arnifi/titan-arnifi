import { Document, model, Model, models, ObjectId, Schema } from "mongoose";

export interface IDivider extends Document {
  stepID: ObjectId;
  label: string;
  isShow: boolean;
  fields: ObjectId[];
}

const dividerSchema: Schema<IDivider> = new Schema<IDivider>(
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

const Divider: Model<IDivider> =
  (models.Divider as Model<IDivider>) ||
  model<IDivider>("Divider", dividerSchema);

export default Divider;

import { Document, model, Model, models, Schema } from "mongoose";

export enum LegalType {
  Will = "will",
  Rental = "rental",
  Agreement = "agreement",
  Other = "other",
}

export interface ILegal extends Document {
  title: string;
  country: string;
  type: LegalType;
  status: boolean;
  downloadCount: number;
  metaData: string;
  steps: Schema.Types.ObjectId[];
}

const legalSchema: Schema<ILegal> = new Schema<ILegal>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: Object.values(LegalType),
      required: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    metaData: {
      type: String,
      trim: true,
    },
    steps: {
      type: [Schema.Types.ObjectId],
      ref: "Step",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Legal: Model<ILegal> =
  (models.Legal as Model<ILegal>) || model<ILegal>("Legal", legalSchema);

export default Legal;

import { Document, model, Model, models, Schema } from "mongoose";

export enum LegalType {
  Will = "will",
  Rental = "rental",
  Agreement = "agreement",
  Other = "other",
}

export interface ILegalDocument extends Document {
  title: string;
  country: string;
  type: LegalType;
  status: boolean;
  downloadCount: number;
  metaData: string;
  steps: Schema.Types.ObjectId[];
}

const legalDocumentSchema: Schema<ILegalDocument> = new Schema<ILegalDocument>(
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

const LegalDocument: Model<ILegalDocument> =
  (models.LegalDocument as Model<ILegalDocument>) ||
  model<ILegalDocument>("LegalDocument", legalDocumentSchema);

export default LegalDocument;

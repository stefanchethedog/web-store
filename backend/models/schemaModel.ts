import { Schema as MongoSchema, model } from "mongoose"

export interface IKey {
  name: string;
  type: string;
  required: boolean;
}

export interface ISchema {
  name: string;
  keys: IKey[];
}

const schemaMetadataSchema = new MongoSchema<ISchema>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  keys: [{
    name: {
      type: String
    },
    type: {
      type: String
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    }
  }]
})

schemaMetadataSchema.index({ name: 1 }, { unique: true });

export const Schema = model<ISchema>('Schema', schemaMetadataSchema)

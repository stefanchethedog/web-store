import { Document, Types } from "mongoose";
import { ISchema } from "../models/schemaModel";

type SchemaType = (Document<unknown, {}, ISchema> & ISchema & {
  _id: Types.ObjectId;
}) | null

enum ValidationError {
  NoData = "No Data",
  MissingRequiredField = "Missing Required Field",
  WrongKeyType = "Wrong Key Type"
}

export default function validPayload(data: any, schema: Partial<SchemaType>): ValidationError | true {
  if (!schema) {
    return ValidationError.NoData;
  }
  for (const key of schema.keys!) {
    if (!data[key.name] && key.required) {
      return ValidationError.MissingRequiredField;
    }
    if (typeof data[key.name] !== key.type) {
      return ValidationError.WrongKeyType;
    }
  }
  return true;
}

import { IKey, IKeyResponse } from "./key";

export interface ISchema {
  name: string;
  keys: IKey[];
}

export interface ISchemaInterface {
  name: string;
  interface: KeyInterface;
}

export interface KeyInterface {
  [key: string]: { type: string, required: boolean }
}

export type ISchemaResponse = {
  _id: string;
  name: string;
  keys: IKeyResponse[]
}

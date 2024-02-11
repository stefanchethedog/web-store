export interface IKey {
  name: string;
  type: string;
  required: boolean;
}

export type IKeyResponse = IKey & { _id: string };

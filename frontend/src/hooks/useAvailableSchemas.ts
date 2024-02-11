import axios from "axios";
import { useEffect, useState } from "react";
import { GET_ALL_SCHEMAS } from "../api";

interface IKey {
  name: string;
  type: string;
  required: boolean;
  _id: string;
}

interface ISchemaResponse {
  _id: string;
  name: string;
  keys: IKey[];
}

export default function useAvailableSchemas() {
  const [schemas, setSchemas] = useState<ISchemaResponse[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .get(GET_ALL_SCHEMAS)
      .then((res) => setSchemas(res.data))
      .catch((_) => setError(true))
  }, []);
  return { schemas: schemas.map((schema) => schema.name), error };
}

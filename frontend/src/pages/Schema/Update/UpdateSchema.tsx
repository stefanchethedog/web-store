import { Error } from "@mui/icons-material";
import {
  TextField,
  Button,
  Stack,
} from "@mui/material";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GET_ALL_SCHEMAS, GET_SCHEMA_BY_NAME, UPDATE_SCHEMA_BY_NAME } from "../../../api";
import { useSnackbar } from "notistack";

import "./UpdateSchema.styles.scss";
import SchemaKey from "../Create/Schema-Key";
import capitalize from "../../../utils/capitalize";

interface UpdateSchemaProps { }

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

const UpdateSchema: FC<UpdateSchemaProps> = ({ }) => {
  const [schema, setSchema] = useState<ISchemaResponse | null>(null);
  const [error, setError] = useState("");
  const { pathname } = useLocation();
  const [schemas, setSchemas] = useState<string[]>([]);

  const { enqueueSnackbar } = useSnackbar();

  const parts = pathname.split("/");
  const schemaName = parts[parts.length - 1];

  useEffect(() => {
    axios
      .get<ISchemaResponse>(GET_SCHEMA_BY_NAME(schemaName))
      .then((response) => {
        setSchema(response.data);
      })
      .catch((reason) => {
        setError(reason);
      });
    axios
      .get<ISchemaResponse[]>(GET_ALL_SCHEMAS)
      .then((response) => setSchemas(response.data.map((schema) => schema.name)))
      .catch((_) => enqueueSnackbar('Failed to fetch available schemas', { variant: "error" }));
  }, []);

  const updateKeys = <T,>(keyName: string, propName: string, value: T) => {
    return schema!.keys.map((k) => {
      if (k.name === keyName) {
        return { ...k, [propName]: value };
      } else return k;
    });
  };

  const handleKeyRemove = (id: number | string) => {
    setSchema({ ...schema!, keys: schema!.keys.filter((key) => key._id !== id) });
  };

  const handleKeyChange = <T,>(keyName: string, propName: string, value: T) => {
    setSchema({
      ...schema!,
      keys: updateKeys(keyName, propName, value),
    });
  };

  return (
    <div className="update-schema__container">
      {error && <Error>{error}</Error>}
      {schema && (
        <>
          Update {schemaName}
          <Stack p="20px" gap="10px">
            <TextField
              label="Name"
              value={schema.name ?? ""}
              onChange={(e) => {
                setSchema({ ...schema, name: e.target.value });
              }}
            ></TextField>
            {schema.keys.map((key) => {
              return (
                <Stack direction="row">
                  <SchemaKey
                    required={key.required}
                    name={key.name}
                    type={key.type}
                    index={key._id}
                    availableSchemas={schemas}
                    onRemove={handleKeyRemove}
                    onPropChange={handleKeyChange}
                  />
                </Stack>
              );
            })}
          </Stack>
          <Button
            variant="outlined"
            color="info"
            onClick={() => {
              setSchema({
                ...schema, keys: [...schema.keys, {
                  name: "", required: false,
                  _id: "", type: ""
                }]
              })
            }}
          >
            Add Key
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              axios
                .put(
                  UPDATE_SCHEMA_BY_NAME(schemaName),
                  { ...schema, keys: schema.keys.map((key) => ({ name: key.name, required: key.required, type: capitalize(key.type) })) }
                )
                .then((_) => {
                  enqueueSnackbar(`Succesfully updated ${schemaName}`);
                })
                .catch((_) => {
                  enqueueSnackbar(`Error when updating ${schemaName}`, {
                    variant: "error",
                  });
                });
            }}
          >
            Update
          </Button>
        </>
      )}
    </div>
  );
};

export default UpdateSchema;

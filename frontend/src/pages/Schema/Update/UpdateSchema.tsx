import { Error } from '@mui/icons-material';
import { Checkbox, TextField, Select, Button, MenuItem, Stack } from '@mui/material';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GET_SCHEMA_BY_NAME, UPDATE_SCHEMA_BY_NAME } from '../../../api';

import './UpdateSchema.styles.scss';

interface UpdateSchemaProps {
}

interface IKey {
  name: string;
  type: string;
  required: boolean;
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
      })
  }, [])

  const updateKeys = <T,>(keyName: string, propName: string, value: T) => {
    return schema!.keys.map((k) => {
      if (k.name === keyName) {
        return { ...k, [propName]: value };
      }
      else return k;
    });
  }

  const handleKeyChange = <T,>(keyName: string, propName: string, value: T) => {
    setSchema({
      ...schema!,
      keys: updateKeys(keyName, propName, value)
    });
  }

  return (
    <div className="update-schema__container">
      {error && <Error>{error}</Error>}
      {schema &&
        <>
          Update {schemaName}
          <Stack p="20px" gap="10px">
            <TextField
              label="Name"
              value={schema.name ?? ""}
              onChange={(e) => {
                setSchema({ ...schema, name: e.target.value })
              }}
            >
            </TextField>
            {schema.keys.map((key) => {
              return (
                <Stack direction="row">
                  <TextField
                    value={key.name}
                    onChange={(e) => handleKeyChange(key.name, "name", e.target.value)}
                  >
                  </TextField>
                  <Select
                    label={key.name}
                    value={key.type.toLowerCase() ?? ""}
                    onChange={(e) => handleKeyChange(key.name, "type", e.target.value)}
                  >
                    {["string", "number"].map((type) => {
                      return (
                        <MenuItem value={type}>{type}</MenuItem>
                      );
                    })}
                  </Select>
                  <Checkbox
                    checked={key.required}
                    onChange={(e) => handleKeyChange(key.name, "required", e.target.value)}
                  />
                </Stack>
              );
            })}
          </Stack>
          <Button
            variant="contained"
            onClick={() => {
              axios
                .put(UPDATE_SCHEMA_BY_NAME(schemaName), { ...schema })
                .then((res) => console.log(res))
                .catch((err) => console.error(err));
            }}
          >
            Update
          </Button>
        </>
      }
    </div>
  );
};

export default UpdateSchema;

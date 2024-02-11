import axios from "axios";
import { useSnackbar } from "notistack";
import { FC, useState } from "react";
import { CREATE_SCHEMA } from "../../../api";

import capitalize from "../../../utils/capitalize";
import "./CreateSchema.styles.scss";
import SchemaKey from "./Schema-Key";

interface CreateSchemaProps { }

interface IKey {
  name: string;
  type: string;
  required: boolean;
  index: number;
}

const CreateSchema: FC<CreateSchemaProps> = ({ }) => {
  const [name, setName] = useState("");
  const [keys, setKeys] = useState<IKey[]>([]);
  const [nextIndex, setNextIndex] = useState(0);

  const { enqueueSnackbar } = useSnackbar();

  const handleSchemaCreation = (name: string, keys: IKey[]) => {
    axios
      .post(CREATE_SCHEMA, { name, keys: keys.map((key) => ({ ...key, type: capitalize(key.type) })) })
      .then(() => {
        enqueueSnackbar(`Created schema with name: ${name}`, { variant: 'success' });
      })
      .catch((_) => {
        enqueueSnackbar(`Error creating schema with name: ${name}`, {
          variant: "error",
        });
      });
  };

  const handleKeyRemove = (index: number | string) => {
    setKeys(keys.filter((key) => key.index !== index));
  };

  const updateKeys = <T,>(keyName: string, propName: string, value: T) => {
    return keys.map((k) => {
      if (k.name === keyName) {
        return { ...k, [propName]: value };
      } else return k;
    });
  };

  const handleKeyChange = <T,>(keyName: string, propName: string, value: T) => {
    setKeys(updateKeys(keyName, propName, value));
  };

  return (
    <div className="create-schema__container">
      Create schema
      <input
        type="text"
        placeholder="Schema name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="schema-keys__container">
        {keys.map((key) => {
          return (
            <>
              <SchemaKey
                name={key.name}
                type={key.type}
                required={key.required}
                index={key.index}
                onRemove={handleKeyRemove}
                onPropChange={handleKeyChange}
              />
            </>
          );
        })}
        <button
          onClick={() => {
            setKeys([
              ...keys,
              { name: "", type: "", required: false, index: nextIndex },
            ]);
            setNextIndex(nextIndex + 1);
          }}
        >
          Add key
        </button>
      </div>
      <button
        onClick={() => {
          handleSchemaCreation(name, keys);
        }}
      >
        Create
      </button>
    </div>
  );
};

export default CreateSchema;

import { FC, useState } from 'react';

import './CreateSchema.styles.scss';
import SchemaKey from './Schema-Key';

interface CreateSchemaProps {
}

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

  const handleNameChange = (value: string, index: number) => {
    setKeys(keys.map((key) => {
      if (key.index === index) {
        return { ...key, name: value };
      }
      else return key;
    }))
  }

  const handleTypeChange = (value: string, index: number) => {
    setKeys(keys.map((key) => {
      if (key.index === index) {
        return { ...key, type: value };
      }
      else return key;
    }))
  }

  const handleRequiredChange = (value: boolean, index: number) => {
    console.log("handle required change");
    setKeys(keys.map((key) => {
      if (key.index === index) {
        return { ...key, required: value };
      }
      else return key;
    }))
  }

  const handleKeyRemove = (index: number) => {
    setKeys(keys.filter((key) => key.index !== index))
  }

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
                onNameChange={handleNameChange}
                onTypeChange={handleTypeChange}
                onRequiredChange={handleRequiredChange}
                onRemove={handleKeyRemove}
              />
            </>
          )
        })}
        <button
          onClick={() => {
            setKeys([...keys, { name: "", type: "", required: false, index: nextIndex }]);
            setNextIndex(nextIndex + 1);
          }}
        >Add key</button>
      </div>
      <button
        onClick={() => {
          console.log({
            name,
            keys: [...keys]
          })
        }}
      >Create</button>
    </div>
  );
};

export default CreateSchema;

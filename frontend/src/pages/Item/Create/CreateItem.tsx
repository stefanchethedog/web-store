import { Stack, TextField, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CREATE_NESTED_ITEM, CREATE_UNNESTED_ITEM, GET_SCHEMA_INTERFACE } from '../../../api';
import { ISchemaInterface } from '../../../types/schema';
import cast from '../../../utils/cast';

import './CreateItem.styles.scss';

interface CreateItemProps {
}

const CreateItem: FC<CreateItemProps> = ({ }) => {
  const { pathname } = useLocation();
  const [interfaces, setInterfaces] = useState<ISchemaInterface[]>([]);
  const [schemaInterface, setSchemaInterface] = useState<ISchemaInterface | null>(null);
  const [item, setItem] = useState<any>({});
  const { enqueueSnackbar } = useSnackbar();

  const paths = pathname.split("/");
  const schemaName = paths.at(-1);

  const getNestedValue = (schemaNames: string[]) => {
    let currentLevel = item;
    for (let i = 1; i < schemaNames.length - 1; i++) {
      const key = schemaNames[i];
      if (!currentLevel[key]) {
        currentLevel[key] = {};
      }
      currentLevel = currentLevel[key];
    }
    const lastKey = schemaNames[schemaNames.length - 1];
    return currentLevel[lastKey!];
  }

  const handleKeyChange = (schemaNames: string[], value: any) => {
    if (schemaNames.length == 2) {
      setItem({ ...item, [schemaNames[1]]: value });
      return;
    }
    setItem((current: any) => {
      let newData = { ...current };
      let currentLevel = newData;
      for (let i = 1; i < schemaNames.length - 1; i++) {
        const key = schemaNames[i];
        if (!currentLevel[key]) {
          currentLevel[key] = {};
        }
        currentLevel = currentLevel[key];
      }
      const lastKey = schemaNames[schemaNames.length - 1];
      currentLevel[lastKey!] = value;
      return newData;
    });
  }

  const handleCreate = () => {
    const isNested = Object.keys(schemaInterface!.interface!).some((key) => schemaInterface!.interface[key].type === 'Schema');
    if (isNested) {
      axios
        .post(CREATE_NESTED_ITEM(schemaName!), { ...item })
        .then((res) => {
          console.log(res);
          enqueueSnackbar('Successfully created an item', { variant: "success" });
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar(`Error creating an item ${err.response.data.error}`, { variant: "error" });
        })
    }
    else {
      axios
        .post(CREATE_UNNESTED_ITEM(schemaName!), { ...item })
        .then((res) => {
          console.log(res);
          enqueueSnackbar('Successfully created an item', { variant: "success" });
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar(`Error creating an item ${err.response.data.error}`, { variant: "error" });
        })
    }
  }

  const renderNested = (schemaName: string[]): any => {
    const schemaInterface = interfaces.filter((iface) => iface.name === schemaName.at(-1))[0];
    return (
      <>
        {Object.keys(schemaInterface.interface).map((key) => {
          if (schemaInterface.interface[key].type === 'Schema') {
            return (
              <Stack>
                <Typography variant="h6">{key}</Typography>
                {renderNested([...schemaName, key])}
              </Stack>
            )
          }
          return (
            <TextField
              key={`${key}-${schemaName}`}
              label={key}
              value={getNestedValue([...schemaName, key])}
              required={schemaInterface.interface[key].required}
              type={schemaInterface.interface[key].type}
              onChange={(e) => handleKeyChange([...schemaName, key], cast(e.target.value, schemaInterface.interface[key].type))}
            >
            </TextField>
          );
        })}
      </>
    );
  }

  useEffect(() => {
    axios
      .get<ISchemaInterface[]>(GET_SCHEMA_INTERFACE)
      .then((res) => {
        setInterfaces(res.data);
        setSchemaInterface(res.data.filter((schemaInterface) => schemaInterface.name === schemaName)[0]);
      })
      .catch((_) => { enqueueSnackbar("Error fetching schema interfaces", { variant: "error" }) });
  }, []);

  return (
    <div className="create-item__container">
      <Typography variant="h4">Create item of {schemaName}</Typography>
      <Stack direction="row">
        {schemaInterface && renderNested([schemaName!])}
      </Stack>
      <Button
        variant="contained"
        onClick={handleCreate}
      >
        Submit
      </Button>
    </div>
  );
};

export default CreateItem;

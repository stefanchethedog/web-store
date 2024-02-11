import { Stack, TextField, Typography, Button } from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GET_SCHEMA_INTERFACE } from '../../../api';
import { ISchema, ISchemaInterface, KeyInterface } from '../../../types/schema';

import './CreateItem.styles.scss';

interface CreateItemProps {
}

const CreateItem: FC<CreateItemProps> = ({ }) => {
  const { pathname } = useLocation();
  const [interfaces, setInterfaces] = useState<ISchemaInterface[]>([]);
  const [schemaInterface, setSchemaInterface] = useState<ISchemaInterface | null>(null);
  const [item, setItem] = useState<any>({});

  const paths = pathname.split("/");
  const schemaName = paths.at(-1);

  const handleKeyChange = (keyName: string, value: any) => {
    setItem({ ...item, [keyName]: value });
  }

  const renderNested = (schemaName: string): any => {
    const schemaInterface = interfaces.filter((iface) => iface.name === schemaName)[0];
    return (
      <>
        {Object.keys(schemaInterface.interface).map((key) => {
          if (schemaInterface.interface[key].type === 'Schema') {
            return (
              <>
                <Typography variant="h6">{key}</Typography>
                {renderNested(key)}
              </>
            )
          }
          return (
            <TextField
              label={key}
              value={item[key]}
              required={schemaInterface.interface[key].required}
              onChange={(e) => handleKeyChange(key, e.target.value)}
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
        {schemaInterface && Object.keys(schemaInterface.interface).map((key) => {
          if (schemaInterface.interface[key].type === 'Schema') {
            return (
              <Stack>
                <Typography variant="h6">{key}</Typography>
                {renderNested(key)}
              </Stack>
            )
          }
          return (
            <TextField
              label={key}
              value={item[key]}
              required={schemaInterface.interface[key].required}
              onChange={(e) => handleKeyChange(key, e.target.value)}
            >
            </TextField>
          );
        })}
      </Stack>
      <Button
        variant="contained"
        onClick={() => console.log(item)}
      >
        Submit
      </Button>
    </div>
  );
};

export default CreateItem;

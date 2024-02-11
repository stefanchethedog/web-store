import { Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GET_ITEM_BY_ID, GET_SCHEMA_INTERFACE } from '../../../api';

import './UpdateItem.styles.scss';

interface UpdateItemProps {
}

const UpdateItem: FC<UpdateItemProps> = ({ }) => {
  const { pathname } = useLocation();
  const paths = pathname.split("/");
  const schemaName = paths.at(-2);
  const itemId = paths.at(-1);
  const [item, setItem] = useState<any>(null);
  const [schemaInterfaces, setSchemaInterfaces] = useState<any>(null);

  const renderNested = (schemaName: string, item: any) => {
    const schemaInterface = schemaInterfaces.filter((schema: any) => schema.name === schemaName)[0].interface;
    return (
      Object.keys(schemaInterface).map((key) => {
        if (typeof item[key] === 'object') {
          return (
            <Stack>
              <Typography variant='h6'>{key}</Typography>
              {renderNested(key, item[key])}
            </Stack>
          );
        }
        return (
          <TextField
            margin="dense"
            label={key}
            value={item[schemaName][key]}
          >
          </TextField>
        );
      })
    );
  }

  useEffect(() => {
    axios
      .get(GET_SCHEMA_INTERFACE)
      .then((res) => setSchemaInterfaces(res.data));
  }, []);

  useEffect(() => {
    axios
      .get(GET_ITEM_BY_ID(schemaName!, itemId!))
      .then((res) => setItem(res.data))
  }, [schemaInterfaces]);

  return (
    <div className="update-item__container">
      <Typography variant="h5">Schema: {schemaName}</Typography>
      <Typography variant="h5">ItemId: {itemId}</Typography>
      <Stack
        direction="row"
        sx={{
          gap: "10px",
        }}
      >
        {(schemaInterfaces && item) && Object.keys(schemaInterfaces.filter((schema: any) => schema.name === schemaName)[0].interface).map((key) => {
          if (typeof item[key] === 'object') {
            return (
              <Stack>
                <Typography variant='h6'>{key}</Typography>
                {renderNested(key, item)}
              </Stack>
            );
          }
          return (
            <TextField
              margin="dense"
              label={key}
              value={item[key]}
            >
            </TextField>
          );
        })}
      </Stack>
    </div>
  );
};

export default UpdateItem;

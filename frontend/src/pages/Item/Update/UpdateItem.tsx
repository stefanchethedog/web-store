import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

import "./UpdateItem.styles.scss";
import {
  GET_ITEM_BY_ID,
  GET_SCHEMA_BY_NAME,
  GET_SCHEMA_INTERFACE,
  UPDATE_ITEM,
} from "../../../api";
import { Button, TextField } from "@mui/material";

interface IItem {
  [key: string | number]: string;
}

type ItemInterface = Partial<IItem>;

interface InterfaceDefinition {
  name: string;
  type: string;
  required: boolean;
}

interface ISchemaData {
  name: string;
  keys: InterfaceDefinition[];
}

const UpdateItem: FC = () => {
  const { id, schemaName } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [item, setItem] = useState<ItemInterface>();
  const [itemSchema, setItemSchema] = useState<ISchemaData>();

  useEffect(() => {
    if (!schemaName || !id) return;
    axios
      .get(GET_ITEM_BY_ID(schemaName, id))
      .then((res) => {
        console.log(res.data);
        setItem(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (!schemaName) return;
    axios
      .get(GET_SCHEMA_BY_NAME(schemaName))
      .then((res) => {
        setItemSchema(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleUpdateItem = async () => {
    if (!id || !schemaName || !item) return;
    axios
      .put(UPDATE_ITEM(schemaName, id), item)
      .then((res) => {
        enqueueSnackbar(`Successfully updated item.`, { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar(`Error updating the item`, { variant: "error" });
      });
  };

  return (
    <div className="update-item__wrapper">
      <div className="update-item__container">
        <h2 className="update-item__container__title">Update {schemaName}</h2>
        {item &&
          itemSchema &&
          itemSchema.keys.map((key, index) => {
            return (
              <div className="update-item__container__field">
                <TextField
                  key={`${key.name},${key.type},${index}`}
                  title={key.name}
                  value={item[String(key.name)]}
                  onChange={(e) => {
                    setItem({ ...item, [key.name]: e.target.value });
                  }}
                  label={key.name}
                  variant="filled"
                  required={key.required}
                />
              </div>
            );
          })}
        <Button
          onClick={() => {
            handleUpdateItem();
          }}
          variant="contained"
          color="info"
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default UpdateItem;

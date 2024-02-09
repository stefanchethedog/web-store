import { FC, useEffect, useState } from "react";

import CardList from "../../../components/CardList";

import "./Main.styles.scss";
import axios from "axios";
import { GET_ALL_ITEMS_FROM_SCHEMAS, GET_SCHEMA_INTERFACE } from "../../../api";

interface InterfaceDefinition {
  [key: string]: string;
}

interface ISchemaData {
  name: String;
  interface: InterfaceDefinition;
}

type SchemaData = ISchemaData[];

const Main: FC = () => {
  const [schemasData, setSchemasData] = useState<SchemaData>();
  const [itemsData, setItemsData] = useState<any[]>();

  useEffect(() => {
    axios.get(GET_SCHEMA_INTERFACE).then((res) => {
      setSchemasData(res.data);
    });
  }, []);

  useEffect(() => {
    if (!schemasData || schemasData.length === 0) return;
    const schemaNames = schemasData?.map((schema) => schema.name);

    axios.post(GET_ALL_ITEMS_FROM_SCHEMAS, schemaNames).then((res) => {
      setItemsData(res.data);
      console.log(res.data);

    });
  }, [schemasData]);

  return (
    <div className="main-items__container">
      {schemasData &&
        itemsData &&
        itemsData.length > 0 &&
        schemasData.length > 0 &&
        schemasData.map((schema, index) => {
          const data = itemsData.find((item) => item.name === schema.name);

          return (
            <CardList
              interfaceForCard={schema.interface}
              create="item"
              data={data.items}
              schemaName={schema.name}
            />
          );
        })}
    </div>
  );
};

export default Main;

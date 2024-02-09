import { FC, useEffect, useState } from "react";
import axios from "axios";

import { Card, CreateCard } from "../../../components";
import { GET_SCHEMA_INTERFACE } from "../../../api";

import "./Main.styles.scss";

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

  useEffect(() => {
    axios.get(GET_SCHEMA_INTERFACE).then((res) => {
      setSchemasData(res.data);
    });
  }, []);
  return (
    <div className="main-schema__container">
      <CreateCard create="schema" className="main-schema__container__card" />
      {schemasData &&
        schemasData.length > 0 &&
        schemasData.map((schema) => {
          return (
            <Card
              interfaceForCard={schema.interface}
              data={schema.interface}
              title={schema.name}
              type="schema"
            />
          );
        })}
    </div>
  );
};

export default Main;

import { FC } from "react";

import "./CardList.styles.scss";
import Card from "../Card/Card.component";
import CreateCard from "../CreateCard";

interface InterfaceDefinition {
  [key: string]: string;
}

interface CardListProps<T> {
  data: T[];
  create: "schema" | "item";
  schemaName: String;
  className?: string;
  interfaceForCard: InterfaceDefinition;
}

function CardList<T>(props: CardListProps<T>) {
  const {
    data,
    className: classes,
    create = "item",
    schemaName,
    interfaceForCard,
  } = props;

  return (
    <div className="card-list__container">
      <h2 className="card-list__container__title">{schemaName}s</h2>
      <div className="card-list__container__wrapper">
        <CreateCard create={create} schemaName={schemaName} />
        {data.length > 0 &&
          data.map((element) => {
            return (
              <Card
                schemaName={schemaName.toString()}
                data={element}
                interfaceForCard={interfaceForCard}
                type="item"
              />
            );
          })}
      </div>
    </div>
  );
}

export default CardList;

import classNames from "classnames";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import "./Card.styles.scss";
import Link from "../Link";

interface InterfaceDefinition {
  [key: string]: string;
}

interface CardProps<T> {
  type: "item" | "schema";
  data?: any;
  title?: String;
  className?: string;
  interfaceForCard: InterfaceDefinition;
}

function Card<T>(props: CardProps<T>) {
  const { className: classes, data, interfaceForCard, title, type } = props;

  const className = classNames("card__container", classes);

  // Recursive function to render nested object properties
  const renderNestedObject = (
    nestedObj: Record<string, any>,
    level: number = 0
  ) => {
    return Object.keys(nestedObj)
      .filter((key) => key !== "_id") // Exclude the _id field
      .map((nestedKey) => {
        const value = nestedObj[nestedKey];
        if (typeof value === "object" && value !== null) {
          return (
            <div key={nestedKey} className="card__container__field__nested">
              <span className="card__container__field__nested__key">{`${nestedKey}:`}</span>{" "}
              {renderNestedObject(value, level + 1)}
            </div>
          );
        } else {
          return (
            <div key={nestedKey} className="card__container__field__nested">
              <span className="card__container__field__nested__key">{`${nestedKey}:`}</span>{" "}
              {`${value}`}
            </div>
          );
        }
      });
  };

  return (
    <div className={className}>
      <div className="card__container__title">{title}</div>
      <div>
        {data &&
          Object.keys(interfaceForCard).map((key: string) => (
            <div key={key} className="card__container__field">
              <span className="card__container__field__key">{`${key}:`}</span>{" "}
              {typeof data[key as keyof T] === "object" ? (
                <div className="card__container__nested">
                  {renderNestedObject(
                    data[key as keyof T] as Record<string, any>,
                    1
                  )}
                </div>
              ) : (
                `${data[key as keyof T]}`
              )}
            </div>
          ))}
      </div>
      <div className="card__container__buttons">
        {data && (
          <Link
            to={`/${type}/update/${type === "schema" ? title : data._id}`}
            className="card__container__buttons__update"
          >
            <EditIcon className="card__container__buttons__icon"/>
          </Link>
        )}
        {data && (
          <Link
            to={`/${type}/delete/${type === "schema" ? title : data._id}`}
            className="card__container__buttons__delete"
          >
            <DeleteIcon className="card__container__buttons__icon"/>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Card;

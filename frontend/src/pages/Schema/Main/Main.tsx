import { FC } from "react";

import { CreateCard } from "../../../components";

import "./Main.styles.scss";

interface MainProps {}

const Main: FC<MainProps> = ({}) => {
  return (
    <div className="main-schema__container">
      <CreateCard create="schema" className="main-schema__container__card" />
    </div>
  );
};

export default Main;

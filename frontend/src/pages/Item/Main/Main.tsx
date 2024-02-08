import { FC } from 'react';

import { Card, CreateCard } from '../../../components';

import './Main.styles.scss';


interface MainProps {
}

const Main: FC<MainProps> = ({}) => {


    return (
        <div className="main-items__container">
            <CreateCard create='item'/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>


        </div>
    );
};

export default Main;

import { FC } from 'react';
import classNames from 'classnames';

import './Card.styles.scss';

interface CardProps {
    className?: String;
}

const Card: FC<CardProps> = ({className: classes}) => {
    const className = classNames("card__container", classes);

    return (
        <div className={className}>
            Test
        </div>
    );
};

export default Card;

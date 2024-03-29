import { FC } from 'react';
import classNames from 'classnames';
import AddIcon from '@mui/icons-material/Add';

import Link from '../Link';

import './CreateCard.styles.scss';

interface CreateCardProps {
    create: 'schema' | 'item'
    schemaName?: String;
    className?: String;
}

const CreateCard: FC<CreateCardProps> = ({className: classes, create, schemaName}) => {
    const className = classNames("create-card__container",classes)

    return (
        <Link className={className} to={`/${create}/create/${schemaName? schemaName :''}`}>
            <AddIcon style={{color: '#08D9D6', fontSize:'100px'}}/>
        </Link>
    );
};

export default CreateCard;

import { FC } from 'react';

import classNames from 'classnames';

import './Sidebar.styles.scss';
import Link from '../Link';

interface SidebarProps {
    className?: String;
}

const Sidebar: FC<SidebarProps> = ({className: classes}) => {
    const className = classNames("sidebar__container", classes)

    return (
        <>
            <div className="sidebar__container__padding"></div>
            <div className={className}>
                <Link to="/">Home</Link>
                <Link to="/schema/main">Schemas</Link>
                <Link to="/item/main">Items</Link>
            </div>
        </>
    );
};

export default Sidebar;

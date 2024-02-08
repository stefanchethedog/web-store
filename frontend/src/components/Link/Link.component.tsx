import { FC, ReactElement } from 'react';
import classNames from 'classnames';
import type { LinkProps as LinkPropsDom } from 'react-router-dom';
import { Link as LinkDom, useMatch, useResolvedPath } from 'react-router-dom';

import './Link.styles.scss';

type LinkProps = {
    className?: String;
} & LinkPropsDom;

const Link: FC<LinkProps> = ({className: classes, children, to, ...rest}) => {
    const resolved = useResolvedPath(to);
    const match = useMatch( { path: resolved.pathname, end: true});

    const className = classNames("link__container", match && "link__container--matched", classes);


    return (
        <div className={className}>
            <LinkDom
                style={{textDecoration: 'none'}}
                className="link__container__link"
                to={to}
                {...rest}
            >
                {children}
            </LinkDom>
        </div>
    );
};

export default Link;

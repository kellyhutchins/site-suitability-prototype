import * as React from 'react';

interface ILoadComponentProps {
    message: string;
}

export default (props: ILoadComponentProps) => (
    <div className="center-style">
        <div className="loader is-active padding-leader-3 padding-trailer-3 center-style">
            <div className="loader-bars"></div>
            <div className="loader-text">{props.message}</div>
        </div>
    </div>
);

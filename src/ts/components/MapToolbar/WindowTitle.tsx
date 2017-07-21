import * as React from 'react';

interface IWindowTitleProps {
    title: string;
    handleMenuToggle: () => void;
};

export default (props: IWindowTitleProps) => (
    <button className="btn btn-transparent map-toolbar-item">
        <b>
            <p className="icon-ui-handle-vertical" onClick={props.handleMenuToggle}>{props.title}</p>
        </b>
    </button>
);

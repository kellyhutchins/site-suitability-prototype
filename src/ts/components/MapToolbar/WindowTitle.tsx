import * as React from 'react';

interface IWindowTitleProps {
    title: string;
    handleMenuToggle: () => void;
};

export default (props: IWindowTitleProps) => (
    <p className="map-toolbar-item icon-ui-handle-vertical" onClick={props.handleMenuToggle}>{props.title}</p>
);

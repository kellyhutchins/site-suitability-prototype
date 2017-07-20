import * as React from 'react';

interface IWindowTitleProps {
    title: string;
};

export default (props) => (
    <p className="map-toolbar-item icon-ui-handle-vertical">{props.title}</p>
);

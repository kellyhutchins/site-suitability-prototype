import * as React from 'react';

interface ICloseButtonProps {
    handleMapClose: (index: number) => void;
    index: number;
};

export default (props: ICloseButtonProps) => (
    <i
        className="map-toolbar-item map-toolbar-button icon-ui-close"
        onClick={() => { props.handleMapClose(props.index) }}
    />
);

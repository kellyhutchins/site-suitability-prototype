import * as React from 'react';

interface ICloneButtonProps {
    handleMapClose: (index: number) => void;
    index: number;
};

export default (props) => (
    <i
        className="map-toolbar-item map-toolbar-button icon-ui-close"
        onClick={() => { props.handleMapClose(props.index) }}
    />
);

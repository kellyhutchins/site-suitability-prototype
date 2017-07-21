import * as React from 'react';

interface ICloneButtonProps {
    handleMapClone: (index: number) => void;
    index: number;
};

export default (props: ICloneButtonProps) => (
    <i
        className="map-toolbar-item map-toolbar-button icon-ui-plus"
        onClick={() => { props.handleMapClone(props.index) }}
    />
);

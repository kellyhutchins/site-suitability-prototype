import * as React from 'react';

interface ICloneButtonProps {
    handleMapClone: (index: number) => void;
    index: number;
};

export default (props: ICloneButtonProps) => (
    <button
        className="btn btn-transparent map-toolbar-item map-toolbar-button icon-ui-plus"
        onClick={() => { props.handleMapClone(props.index) }}
    />
);

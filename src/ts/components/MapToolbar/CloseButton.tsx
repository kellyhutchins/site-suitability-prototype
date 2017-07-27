import * as React from 'react';

interface ICloseButtonProps {
    handleMapClose: (index: number) => void;
    index: number;
    mapOrder: string;
    mapNumber: number;
};

export default (props: ICloseButtonProps) => (
    <button
        className={`
            btn
            btn-transparent
            map-toolbar-item
            map-toolbar-button
            ${props.index !== props.mapNumber && props.mapNumber !== 0 && props.mapOrder !== 'column' ? 'toolbar-tooltip' : 'toolbar-tooltip tt-left'}
        `}
        aria-label="Close map"
        onClick={() => { props.handleMapClose(props.index) }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className="svg-icon"><path d="M18.404 16l9.9 9.9-2.404 2.404-9.9-9.9-9.9 9.9L3.696 25.9l9.9-9.9-9.9-9.898L6.1 3.698l9.9 9.899 9.9-9.9 2.404 2.406-9.9 9.898z"/></svg>
    </button>
);

import * as React from 'react';

interface ICloneButtonProps {
    handleMapClone: (index: number) => void;
    index: number;
    mapOrder: string;
    mapNumber: number;
};

export default (props: ICloneButtonProps) => (
    <button
        className={`
            btn
            btn-transparent
            map-toolbar-item
            map-toolbar-button
            ${props.index !== props.mapNumber && props.mapNumber !== 0 && props.mapOrder !== 'column' ? 'toolbar-tooltip' : 'toolbar-tooltip-left'}
        `}
        aria-label="Duplicate map"
        onClick={() => { props.handleMapClone(props.index) }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className="svg-icon"><path d="M30 18H18v12h-4V18H2v-4h12V2h4v12h12v4z"/></svg>
    </button>
);

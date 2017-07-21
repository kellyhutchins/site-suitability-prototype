import * as React from 'react';

interface IWindowTitleProps {
    index: number;
    title: string;
    handleMenuToggle: () => void;
    menuActive: boolean;
    mapOrder: string;
    mapNumber: number;
};

export default (props: IWindowTitleProps) => (
    <button
        className={`
            btn btn-transparent map-toolbar-item
            ${props.index !== 0 && props.mapOrder !== 'column' ? 'toolbar-tooltip' : 'toolbar-tooltip-right'}
        `}
        aria-label={props.menuActive ? 'Close menu' : 'Customize Arcade model'}
    >
        <b>
            <p
                className={`${props.menuActive ? 'icon-ui-left' : 'icon-ui-handle-vertical'} window-title`}
                onClick={props.handleMenuToggle}
            >
                {props.title}
            </p>
        </b>
    </button>
);

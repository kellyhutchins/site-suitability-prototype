import * as React from 'react';

interface IWindowTitleProps {
    handleMenuToggle: () => void;
    handleTitleChange: (index: number, title: string) => void;
    toggleChangingTitle: () => void;
    changingTitle: boolean;
    index: number;
    title: string;
    menuActive: boolean;
    mapOrder: string;
    mapNumber: number;
};

export default (props: IWindowTitleProps) => {
    if (props.changingTitle) {
        return (
            <input
                className="window-title-input"
                type="text"
                value={props.title}
                onChange={
                    (e) => {
                        e.preventDefault();
                        props.handleTitleChange(props.index, e.target.value);
                    }
                }
                onKeyPress={
                    (e) => {
                        if (e.keyCode === 13) {
                            e.preventDefault();
                            props.toggleChangingTitle();
                        }
                    }
                }
            />
        );
    }
    return (
        <button
            className={`
                btn btn-transparent map-toolbar-item
                ${props.index !== 0 && props.mapOrder !== 'column' ? 'toolbar-tooltip' : 'toolbar-tooltip tt-right'}
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
};

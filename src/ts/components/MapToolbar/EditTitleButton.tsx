import * as React from 'react';

interface IEditTitleButtonProps {
    toggleChangingTitle: () => void;
    changingTitle: boolean;
    index: number;
    map: {
        key: string;
        title: string;
        id: string;
        liveRendering: boolean;
        exposedProperties: {
            [propName: string]: {
                value: any,
                inputType: string;
                min?: number;
                max?: number;
                interval?: number;
            };
        }
        viewpoint?: __esri.Viewpoint;
    };
    mapOrder: string;
    mapNumber: number;
}

export default (props: IEditTitleButtonProps) => {
    const icon = props.changingTitle ? 
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className="svg-icon"><path fill="#5a9359" d="M11.927 22l-6.882-6.883-3 3L11.927 28 31.204 8.728l-3.001-3.001z"/></svg>
    : <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className="svg-icon"><path d="M27.443 9.439l-4.955-4.953 1.652-1.65a2.337 2.337 0 0 1 3.301 0l1.648 1.65a2.33 2.33 0 0 1 .004 3.299l-1.65 1.654zM4.924 22.195l-2.373 7.254 7.328-2.301-4.955-4.953zM20.455 6.713L7.379 19.555l4.951 4.949 13.074-12.842-4.949-4.949z"/></svg>
    return (
        <button
            className={`
                btn
                btn-transparent
                map-toolbar-item
                edit-title-button
                ${props.index !== 0 && props.mapOrder !== 'column' ? 'toolbar-tooltip' : 'toolbar-tooltip-right'}
            `}
            aria-label={props.changingTitle ? 'Accept changes' : 'Edit title'}
            onClick={() => { props.toggleChangingTitle() }}
        >
            {icon}
        </button>
    );
}

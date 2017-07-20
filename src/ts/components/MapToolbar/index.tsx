import * as React from 'react';
import CloneButton from './CloneButton';
import CloseButton from './CloseButton';
import WindowTitle from './WindowTitle';

interface IToolbarProps {
    handleMapClone: (index: number) => void;
    handleMapClose: (index: number) => void;
    index: number;
    map: {
        key: string;
        title: string;
        [propName: string]: any;
    };
}

export default (props: IToolbarProps) => (
    <header className="map-toolbar">
        <WindowTitle title={props.map.title} />
        <CloseButton handleMapClose={props.handleMapClose} index={props.index} />
        <CloneButton handleMapClone={props.handleMapClone} index={props.index} />
    </header>
);

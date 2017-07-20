import * as React from 'react';
import { WebMap } from 'react-arcgis';

export default (props) => (
    <div
        className="map-window"
        style={{ width: props.itemWidth, height: props.itemHeight }}
    >
        <header className="map-toolbar">
            <p className="map-toolbar-item icon-ui-handle-vertical">{props.map.title}</p>
            <i className="map-toolbar-item map-toolbar-button icon-ui-close" onClick={() => { props.handleMapClose(props.index) }} />
            <i className="map-toolbar-item map-toolbar-button icon-ui-plus" onClick={() => { props.handleMapClone(props.index) }} />
        </header>
        <WebMap
            className="map-container"
            id="ec108b241fe24cbab6313c0134e53cec"
        />
    </div>
);

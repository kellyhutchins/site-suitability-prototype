import * as React from 'react';
import { Map } from 'react-arcgis';

export default (props) => (
    <Map
        style={{ display: 'inline-block', height: `${props.mapHeight}px`, width: '50%' }}
        mapProperties={{ basemap: 'osm' as __esri.BasemapProperties }}
    />
);

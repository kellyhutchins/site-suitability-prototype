import * as React from 'react';
import { Map } from 'react-arcgis';
import MapToolbar from './MapToolbar';

interface IComponentProps {
    handleMapClone: (index: number) => void;
    handleMapClose: (index: number) => void;
    handleMapViewpoint: (index: number, viewpoint: __esri.Viewpoint) => void;
    index: number;
    itemHeight: string;
    itemWidth: string;
    key: string;
    map: {
        key: string;
        title: string;
        [propName: string]: any;
    };
}

interface IComponentState {
    map: __esri.Map;
    view: __esri.MapView;
}

export default class MapWindow extends React.Component<IComponentProps, IComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            view: null
        };
        this.handleMapLoad = this.handleMapLoad.bind(this);
    }

    public render() {
        return (
            <div
                className="map-window"
                style={{ width: this.props.itemWidth, height: this.props.itemHeight }}
            >
                <MapToolbar
                    handleMapClone={this.props.handleMapClone}
                    handleMapClose={this.props.handleMapClose}
                    index={this.props.index}
                    map={this.props.map}
                />
                <Map
                    className="map-container"
                    mapProperties={{ basemap: 'osm' as __esri.BasemapProperties }}
                    viewProperties={ this.props.map.viewpoint ? { viewpoint: this.props.map.viewpoint } : {}}
                    onLoad={this.handleMapLoad}
                />
            </div>
        );
    }

    private handleMapLoad(map: __esri.Map, view: __esri.MapView) {
        this.setState({
            map, view
        });
        view.watch('viewpoint', (viewpoint: __esri.Viewpoint) => {
            this.props.handleMapViewpoint(this.props.index, viewpoint)
        });
    }
}
// id="ec108b241fe24cbab6313c0134e53cec"

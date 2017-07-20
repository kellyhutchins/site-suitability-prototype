import * as React from 'react';
import { Map } from 'react-arcgis';

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
                <header className="map-toolbar">
                    <p className="map-toolbar-item icon-ui-handle-vertical">{this.props.map.title}</p>
                    <i
                        className="map-toolbar-item map-toolbar-button icon-ui-close"
                        onClick={() => { this.props.handleMapClose(this.props.index) }}
                    />
                    <i
                        className="map-toolbar-item map-toolbar-button icon-ui-plus"
                        onClick={() => { this.props.handleMapClone(this.props.index) }}
                    />
                </header>
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

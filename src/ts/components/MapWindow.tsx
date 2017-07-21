import * as React from 'react';
import esriPromise from 'esri-promise';
import { WebMap } from 'react-arcgis';
import MapToolbar from './MapToolbar';

interface IComponentProps {
    handleMapClone: (index: number) => void;
    handleMapClose: (index: number) => void;
    handleMapViewpoint: (index: number, viewpoint: __esri.Viewpoint) => void;
    handlePropertyChange: (index: number, propertyName: string, value: any) => void;
    index: number;
    itemHeight: string;
    itemWidth: string;
    key: string;
    map: {
        key: string;
        title: string;
        id: string;
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
        this.parseArcade = this.parseArcade.bind(this);
        this.updateRenderer = this.updateRenderer.bind(this);
        this.handlePropertyChange = this.handlePropertyChange.bind(this);
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
                    handlePropertyChange={this.handlePropertyChange}
                    updateRenderer={this.updateRenderer}
                    index={this.props.index}
                    map={this.props.map}
                />
                <WebMap
                    className="map-container"
                    id={this.props.map.id}
                    mapProperties={{ basemap: 'osm' as __esri.BasemapProperties }}
                    viewProperties={ this.props.map.viewpoint ? { viewpoint: this.props.map.viewpoint } : {}}
                    onLoad={this.handleMapLoad}
                />
            </div>
        );
    }

    public handlePropertyChange(propName: string, value: any) {
        this.props.handlePropertyChange(this.props.index, propName, value);
    }

    public updateRenderer() {
        const expression = this.state.map.layers.get('items')[1].renderer.valueExpression;
        const renderer: __esri.Renderer = this.state.map.layers.get('items')[1].renderer;
        const rendererJSON = renderer.toJSON();

        const newExpression = this.parseArcade(expression);
        rendererJSON.valueExpression = newExpression;
        rendererJSON.visualVariables[0].valueExpression = newExpression;

        esriPromise(['esri/renderers/ClassBreaksRenderer']).then(([
            ClassBreaksRendererConstructor
        ]) => {
            const ClassBreaksRenderer: __esri.ClassBreaksRendererConstructor = ClassBreaksRendererConstructor;
            const newRenderer = ClassBreaksRenderer.fromJSON(rendererJSON);
            this.state.map.layers.get('items')[1].set('renderer', newRenderer);
        });
    }

    private handleMapLoad(map: __esri.WebMap, view: __esri.MapView) {
        this.setState({
            map, view
        });
        view.watch('viewpoint', (viewpoint: __esri.Viewpoint) => {
            this.props.handleMapViewpoint(this.props.index, viewpoint);
        });
        this.updateRenderer();
    }

    private parseArcade(expression) {
        return expression.split('\n').map((line) => {
            const matchingExposedProperty = Object.keys(this.props.map.exposedProperties).reduce((p, c, i) => {
                if (line.indexOf(`var ${c} =`) !== -1) {
                    return c;
                }
                return p;
            }, null);
            if (matchingExposedProperty) {
                return `var ${matchingExposedProperty} = ${this.props.map.exposedProperties[matchingExposedProperty].value}`;
            }
            return line;
        }).join('\n');
    }
}

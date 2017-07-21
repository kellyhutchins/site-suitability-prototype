import * as React from 'react';
import esriPromise from 'esri-promise';
import { WebMap } from 'react-arcgis';
import MapToolbar from './MapToolbar';
import { Promise } from 'es6-promise';

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
    instances: Array<{
        constructor: any,
        originalJSON: any,
        expressions: Array<{
            expressionString: string,
            jsonPath: (string | number)[]
        }>
    }>;
}

export default class MapWindow extends React.Component<IComponentProps, IComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            view: null,
            instances: null
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
        // Need to look at each instance (renderer, popup, etc) that may have an arcade expression
        this.state.instances.forEach((instance) => {
            // Will duplicate the JSON for that instance (required in order to clone it with new values)
            const newJSON = {...instance.originalJSON};
            // Look at each expression in the particular instance
            instance.expressions.forEach((expression) => {
                // This gets us to the expression's instance path stored in jsonPath
                expression.jsonPath.reduce((p, c, i) => {
                    if (i === expression.jsonPath.length - 1) {
                        // Finally, set the value in the JSON equal to the new expression
                        p[c] = this.parseArcade(expression.expressionString);
                    }
                    return p[c];
                }, newJSON);
            });

            /*
                Once the new expression is set in the JSON, recreate the instance from the JSON using the appropriate function,
                and apply it to our map. In the future the instance path on the map will have to be stored
            */
            this.state.map.layers.get('items')[1].set('renderer', instance.constructor(newJSON));
        });
    }

    private handleMapLoad(map: __esri.WebMap, view: __esri.MapView) {
        this.setState({
            map, view
        });
        view.watch('viewpoint', (viewpoint: __esri.Viewpoint) => {
            this.props.handleMapViewpoint(this.props.index, viewpoint);
        });
        this.getInstances().then(() => {
            this.updateRenderer();
        });
    }

    private getInstances() {
        const expression = this.state.map.layers.get('items')[1].renderer.valueExpression;
        const renderer: __esri.Renderer = this.state.map.layers.get('items')[1].renderer;
        const rendererJSON = renderer.toJSON();

        return esriPromise(['esri/renderers/ClassBreaksRenderer']).then(([
            ClassBreaksRendererConstructor
        ]) => {
            this.setState({
                instances: [
                    {
                        constructor: ClassBreaksRendererConstructor.fromJSON,
                        originalJSON: rendererJSON,
                        expressions: [
                            {
                                expressionString: expression,
                                jsonPath: ['valueExpression']
                            },
                            {
                                expressionString: expression,
                                jsonPath: ['visualVariables', 0, 'valueExpression']
                            }
                        ]
                    }
                ]
            });
            return Promise.resolve();
        });
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

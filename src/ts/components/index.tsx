import * as React from 'react';
import MapWindow from './MapWindow';
import Header from './Header';

interface IComponentProps {};

interface IComponentState {
    height: string;
    width: string;
    itemHeight: string;
    itemWidth: string;
    maps: Array<{
        key: string;
        title: string;
        id: string;
        exposedProperties: {
            [propName: string]: {
                description?: string;
                value: any,
                inputType: string;
                min?: number;
                max?: number;
                interval?: number;
            };
        }
        viewpoint?: __esri.Viewpoint;
    }>;
}

export default class Main extends React.Component<IComponentProps, IComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            height: '100%',
            width: '100%',
            itemHeight: '100%',
            itemWidth: '100%',
            maps: [
                {
                    id: 'ec108b241fe24cbab6313c0134e53cec',
                    key: Math.random().toString(36).substring(5),
                    title: 'Map 1',
                    exposedProperties: {
                        wtVac: {
                            description: `wtVac is a variable in the arcade script.`,
                            value: 50,
                            inputType: 'range',
                            min: 0,
                            max: 100,
                            interval: 1
                        },
                        wtImpR: {
                            description: `This is another variable.`,
                            value: 20,
                            inputType: 'range',
                            min: 0,
                            max: 100,
                            interval: 1
                        },
                        wtYear: {
                            value: 10,
                            inputType: 'range',
                            min: 0,
                            max: 100,
                            interval: 1
                        },
                        wtLanduse: {
                            value: 10,
                            inputType: 'range',
                            min: 0,
                            max: 100,
                            interval: 1
                        },
                        wtRFAR: {
                            value: 10,
                            inputType: 'range',
                            min: 0,
                            max: 100,
                            interval: 1
                        }
                    }
                }
            ]
        };
        this.handleMapClose = this.handleMapClose.bind(this);
        this.handleMapClone = this.handleMapClone.bind(this);
        this.updateWindowContainerSize = this.updateWindowContainerSize.bind(this);
        this.handleMapViewpoint = this.handleMapViewpoint.bind(this);
        this.handlePropertyChange = this.handlePropertyChange.bind(this);
    }

    public componentDidMount() {
        window.addEventListener('resize', this.updateWindowContainerSize);
        this.updateWindowContainerSize();
    }

    public render() {
        const Maps = this.state.maps.map((item, i) => (
            <MapWindow
                handleMapClone={this.handleMapClone}
                handleMapClose={this.handleMapClose}
                handleMapViewpoint={this.handleMapViewpoint}
                handlePropertyChange={this.handlePropertyChange}
                index={i}
                itemHeight={this.state.itemHeight}
                itemWidth={this.state.itemWidth}
                key={item.key}
                map={item}
            />
        ));
        return (
            <div className="app-container">
                <Header />
                <div
                    className="window-container"
                    style={{ width: this.state.width, height: this.state.height }}
                >
                    {Maps}
                </div>
            </div>
        );
    }

    public handleMapClose(index) {
        const newArr = [...this.state.maps];
        newArr.splice(index, 1);
        this.setState({
            maps: newArr
        });
        this.updateWindowContainerSize();
    }

    public handleMapClone(index) {
        const newMap = {
            ...this.state.maps[index],
            key: Math.random().toString(36).substring(5),
            title: `${this.state.maps[index].title} (clone)`
        };
        this.setState({
            maps: this.state.maps
                    .slice(0, index + 1)
                    .concat([newMap])
                    .concat(
                        index === this.state.maps.length - 1 ?
                        [] :
                        this.state.maps.slice(index - (this.state.maps.length - 1))
                    )
        });
        this.updateWindowContainerSize();
    }

    public handleMapViewpoint(index: number, viewpoint: __esri.Viewpoint) {
        this.setState({
            maps: this.state.maps.map((item, i) => {
                if (i === index) {
                    return { ...item, viewpoint };
                }
                return item;
            })
        });
    }

    public handlePropertyChange(mapIndex: number, propertyName: string, value: any) {
        this.setState({
            maps: this.state.maps.map((item, i) => {
                if (i === mapIndex) {
                    const newExposedProperties = {...this.state.maps[mapIndex].exposedProperties};
                    newExposedProperties[propertyName] = {
                        ...newExposedProperties[propertyName],
                        value
                    };
                    return {
                        ...item,
                        exposedProperties: newExposedProperties
                    };
                }
                return item;
            })
        });
    }

    private updateWindowContainerSize() {
        const widthPx = document.body.clientWidth;
        const heightPx = (document.body.clientHeight - document.getElementById('app-nav').clientHeight);
        if ( widthPx > heightPx ) {
            this.setState({
                height: `${heightPx}px`,
                width: `${widthPx}px`,
                itemHeight: '100%',
                itemWidth: `${widthPx / this.state.maps.length}px`
            });
        } else {
            this.setState({
                height: `${heightPx}px`,
                width: `${widthPx}px`,
                itemHeight: `${heightPx / this.state.maps.length}px`,
                itemWidth: '100%'
            });
        }
    }
};

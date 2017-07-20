import * as React from 'react';
import MapWindow from './MapWindow';

interface IComponentProps {};

interface IComponentState {
    height: string;
    width: string;
    itemHeight: string;
    itemWidth: string;
    maps: Array<{
        key: string;
        title: string;
        [propName: string]: any;
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
                    key: Math.random().toString(36).substring(5),
                    title: 'Map 1'
                }
            ]
        };
        this.handleMapClose = this.handleMapClose.bind(this);
        this.handleMapClone = this.handleMapClone.bind(this);
        this.updateWindowContainerSize = this.updateWindowContainerSize.bind(this);
        this.handleMapViewpoint = this.handleMapViewpoint.bind(this);
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
                index={i}
                itemHeight={this.state.itemHeight}
                itemWidth={this.state.itemWidth}
                key={item.key}
                map={item}
            />
        ));
        return (
            <div className="app-container">
                <header id="app-nav" className="top-nav fade-in">
                    <div className="grid-container">
                        <div className="column-24">
                            <div className="tablet-hide">
                                <a className="skip-to-content" href="#skip-to-content">Skip To Content</a>
                                <a href="#" className="top-nav-title">Site Suitability Prototype</a>

                                <nav className="class-top-nav-list right" role="navigation" aria-labelledby="usernav">
                                    <a
                                        className="top-nav-link icon-ui-user margin-left-1"
                                        href="#"
                                    >
                                        Sign In
                                    </a>
                                </nav>
                            </div>

                            <div className="tablet-show top-nav-flex">
                                <nav className="top-nav-flex-list" role="navigation" aria-labelledby="topnav">
                                    <a
                                        href="/"
                                        className="icon-ui-menu top-nav-link js-drawer-toggle"
                                        data-drawer="left"
                                    >
                                        <span className="phone-hide">Menu</span>
                                    </a>
                                </nav>
                            <header className="top-nav-flex-title">
                                <a href="/" className="top-nav-link">Site Suitability Prototype</a>
                            </header>
                                <nav className="top-nav-flex-list text-right" role="navigation" aria-labelledby="usernav">
                                    <button
                                        className="icon-ui-search phone-hide search-top-nav link-dark-gray js-search-toggle"
                                        aria-label="Search"
                                    >
                                        Search
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>
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

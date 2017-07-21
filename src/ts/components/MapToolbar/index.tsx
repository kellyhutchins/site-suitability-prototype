import * as React from 'react';
import CloneButton from './CloneButton';
import CloseButton from './CloseButton';
import EditTitleButton from './EditTitleButton';
import Menu from './Menu';
import WindowTitle from './WindowTitle';

interface IComponentProps {
    handleMapClone: (index: number) => void;
    handleMapClose: (index: number) => void;
    handlePropertyChange: (propertyName: string, value: any) => void;
    handleLiveRenderingChange: (index: number, value: boolean) => void;
    handleTitleChange: (index: number, value: string) => void;
    updateRenderer: () => void;
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

interface IComponentState {
    menuActive: boolean;
    changingTitle: boolean;
}

export default class MapToolbar extends React.Component<IComponentProps, IComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            changingTitle: false,
            menuActive: false
        };
        this.handleMenuToggle = this.handleMenuToggle.bind(this);
        this.toggleChangingTitle = this.toggleChangingTitle.bind(this);
    }
    public render() {
        let menu = null;
        if (this.state.menuActive) {
            menu = <Menu
                handlePropertyChange={this.props.handlePropertyChange}
                handleLiveRenderingChange={this.props.handleLiveRenderingChange}
                updateRenderer={this.props.updateRenderer}
                index={this.props.index}
                map={this.props.map}
            />;
        }
        return (
            <header className="map-toolbar">
                <WindowTitle
                    handleMenuToggle={this.handleMenuToggle}
                    handleTitleChange={this.props.handleTitleChange}
                    toggleChangingTitle={this.toggleChangingTitle}
                    changingTitle={this.state.changingTitle}
                    title={this.props.map.title}
                    menuActive={this.state.menuActive}index={this.props.index}
                    mapOrder={this.props.mapOrder}
                    mapNumber={this.props.mapNumber}
                />
                <EditTitleButton
                    toggleChangingTitle={this.toggleChangingTitle}
                    changingTitle={this.state.changingTitle}
                    index={this.props.index}
                    map={this.props.map}
                    mapOrder={this.props.mapOrder}
                    mapNumber={this.props.mapNumber}
                />
                <CloseButton
                    handleMapClose={this.props.handleMapClose}
                    index={this.props.index}
                    mapOrder={this.props.mapOrder}
                    mapNumber={this.props.mapNumber}
                />
                <CloneButton
                    handleMapClone={this.props.handleMapClone}
                    index={this.props.index}
                    mapOrder={this.props.mapOrder}
                    mapNumber={this.props.mapNumber}
                />
                {menu}
            </header>
        );
    }

    public handleMenuToggle() {
        this.setState({
            menuActive: !this.state.menuActive
        });
    }

    public toggleChangingTitle() {
        if (!this.state.changingTitle) {
            setTimeout(() => {
                document.querySelector('.window-title-input')['focus']();
            }, 1);
        }
        this.setState({
            changingTitle: !this.state.changingTitle
        });
    }
}

import * as React from 'react';
import CloneButton from './CloneButton';
import CloseButton from './CloseButton';
import WindowTitle from './WindowTitle';
import Menu from './Menu';

interface IComponentProps {
    handleMapClone: (index: number) => void;
    handleMapClose: (index: number) => void;
    handlePropertyChange: (propertyName: string, value: any) => void;
    updateRenderer: () => void;
    index: number;
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
    menuActive: boolean;
}

export default class MapToolbar extends React.Component<IComponentProps, IComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            menuActive: false
        };
        this.handleMenuToggle = this.handleMenuToggle.bind(this);
    }
    public render() {
        let menu = null;
        if (this.state.menuActive) {
            menu = <Menu
                handlePropertyChange={this.props.handlePropertyChange}
                updateRenderer={this.props.updateRenderer}
                map={this.props.map}
            />;
        }
        return (
            <header className="map-toolbar">
                <WindowTitle handleMenuToggle={this.handleMenuToggle} title={this.props.map.title} />
                <CloseButton handleMapClose={this.props.handleMapClose} index={this.props.index} />
                <CloneButton handleMapClone={this.props.handleMapClone} index={this.props.index} />
                {menu}
            </header>
        );
    }

    public handleMenuToggle() {
        this.setState({
            menuActive: !this.state.menuActive
        });
    }
}

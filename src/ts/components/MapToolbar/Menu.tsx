import * as React from 'react';

interface IComponentProps {
    handlePropertyChange: (propertyName: string, value: any) => void;
    updateRenderer: () => void;
    map: {
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
    };
}

interface IComponentState {
    liveRenderingEnabled: boolean;
}

export default class Menu extends React.Component<IComponentProps, IComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            liveRenderingEnabled: false
        };

        this.toggleLiveRendering = this.toggleLiveRendering.bind(this);
    }

    public render() {
        const options = Object.keys(this.props.map.exposedProperties).map((propertyName, i) => {
            const propertyValues = this.props.map.exposedProperties[propertyName];
            const propertyDescription = propertyValues.description ? (
                <p className="property-description">
                    {propertyValues.description}
                </p>
            ) : null;
            return (
                <div>
                    <label>
                        {propertyName} ({propertyValues.value})
                        {propertyDescription}
                        <input
                            className="property-input"
                            type={propertyValues.inputType}
                            min={propertyValues.min}
                            max={propertyValues.max}
                            value={propertyValues.value}
                            onChange={
                                (e) => {
                                    e.preventDefault();
                                    this.props.handlePropertyChange(propertyName, e.target.value);
                                    if (this.state.liveRenderingEnabled) {
                                        this.props.updateRenderer();
                                    }
                                }
                            }
                        />
                    </label>
                </div>
            );
        });
        const applyButton = this.state.liveRenderingEnabled ?
            null :
            (
                <button
                    className="btn btn-clear btn-fill apply-button"
                    onClick={() => { this.props.updateRenderer() }}
                >
                    Apply
                </button>
            );
        return (
            <div className="map-menu">
                {options}
                <label>
                    <span
                        className="property-description"
                    >
                         Live rendering (slow-ish)
                    </span>
                    <input
                        onChange={this.toggleLiveRendering}
                        checked={this.state.liveRenderingEnabled}
                        type="checkbox"
                    />
                </label>
                {applyButton}
            </div>
        );
    }

    private toggleLiveRendering(e) {
        e.preventDefault();
        this.setState({
            liveRenderingEnabled: !this.state.liveRenderingEnabled
        });
    }
};

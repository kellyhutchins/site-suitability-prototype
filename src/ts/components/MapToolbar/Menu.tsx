import * as React from 'react';

interface IComponentProps {
    handlePropertyChange: (propertyName: string, value: any) => void;
    handleLiveRenderingChange: (index: number, value: boolean) => void;
    updateRenderer: () => void;
    index: number;
    map: {
        key: string;
        title: string;
        id: string;
        liveRendering: boolean;
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

export default class Menu extends React.Component<IComponentProps> {
    constructor(props) {
        super(props);
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
                                    if (this.props.map.liveRendering) {
                                        this.props.updateRenderer();
                                    }
                                }
                            }
                        />
                    </label>
                </div>
            );
        });
        const applyButton = this.props.map.liveRendering ?
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
                        checked={this.props.map.liveRendering}
                        type="checkbox"
                    />
                </label>
                {applyButton}
            </div>
        );
    }

    private toggleLiveRendering(e) {
        e.preventDefault();
        this.props.handleLiveRenderingChange(this.props.index, !this.props.map.liveRendering);
    }
};

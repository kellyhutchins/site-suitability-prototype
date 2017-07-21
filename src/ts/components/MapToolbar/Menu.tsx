import * as React from 'react';

interface IMenuProps {
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

export default (props: IMenuProps) => {
    const options = Object.keys(props.map.exposedProperties).map((propertyName, i) => {
        const propertyValues = props.map.exposedProperties[propertyName];
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
                                props.handlePropertyChange(propertyName, e.target.value);
                            }
                        }
                    />
                </label>
            </div>
        );
    });
    return (
        <div className="map-menu">
            {options}
            <button className="btn btn-clear btn-fill apply-button" onClick={() => { props.updateRenderer() }}>Apply</button>
        </div>
    );
};

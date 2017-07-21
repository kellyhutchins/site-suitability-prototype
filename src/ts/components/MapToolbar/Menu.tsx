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
        return (
            <div>
                <label>
                    {propertyName} ({propertyValues.value})
                    <input
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
            <h4>Customize site suitability model:</h4>
            {options}
            <button className="btn btn-clear" onClick={() => { props.updateRenderer() }}>Apply</button>
        </div>
    );
};

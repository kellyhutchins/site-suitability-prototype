import * as React from 'react';

const centerStyle = {
    left: '50%',
    marginRight: '-50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)'
};

export default (props) => (
    <div style={centerStyle as any}>
        <div className="loader is-active padding-leader-3 padding-trailer-3 center-style">
            <div className="loader-bars"></div>
            <div className="loader-text">Loading..</div>
        </div>
    </div>
);

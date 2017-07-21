import * as React from 'react';

export default (props) => (
    <header id="app-nav" className="top-nav fade-in">
        <div className="grid-container">
            <div className="column-24">
                <div className="tablet-hide">
                    <a className="skip-to-content" href="#skip-to-content">Skip To Content</a>
                    <a href="#" className="top-nav-title">Site Suitability Prototype</a>
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
                </div>
            </div>
        </div>
    </header>
);

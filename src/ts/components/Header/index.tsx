import * as React from 'react';

export default (props) => (
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
);

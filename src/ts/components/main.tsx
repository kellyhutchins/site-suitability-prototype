import * as React from 'react';
import Bermuda from './SiteSuitability';

interface IComponentProps {};

interface IComponentState {
    height: number;
}

export default class Main extends React.Component<IComponentProps, IComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            height: 80
        };
    }

    public componentDidMount() {
        const w = window;
        const d = document;
        const e = d.documentElement;
        const g = d.getElementsByTagName('body')[0];
        const windowHeight = w.innerHeight|| e.clientHeight|| g.clientHeight;
        const height = (windowHeight - document.getElementById('app-header').clientHeight);
        this.setState({ height });
    }

    public render() {
        return (
            <div className="app-container">
                <header id="app-header" className="top-nav fade-in">
                    <div className="grid-container">
                        <div className="column-24">
                            <div className="tablet-hide">
                                <a className="skip-to-content" href="#skip-to-content">Skip To Content</a>
                                <a href="#" className="top-nav-title">Model Explorer</a>

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
                                <a href="/" className="top-nav-link">Model Explorer</a>
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
                <Bermuda mapHeight={this.state.height} />
                <Bermuda mapHeight={this.state.height} />
            </div>
        );
    }
};

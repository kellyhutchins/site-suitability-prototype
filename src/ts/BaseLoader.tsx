import * as React from 'react';
import App from './components';
import LoadComponent from './components/LoadComponent';

interface IComponentProps {
    boilerplate: any;
    i18n: any;
};

interface IComponentState {
    loadStatus: string;
};

export default class BaseLoader extends React.Component<IComponentProps, IComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            loadStatus: 'loading'
        };
    }

    public render() {
        if (this.state.loadStatus === 'loading') {
            return (
                <h3 className="center-style">Boiling...</h3>
            );
        } else if  (this.state.loadStatus === 'loaded') {
            return (
                <App boilerplate={this.props.boilerplate} i18n={this.props.i18n} />
            );
        }
        return (
            <h3>Something failed..</h3>
        );
    }

    public componentDidMount() {
        this.props.boilerplate.load().then(() => {
            this.setState({
                loadStatus: 'loaded'
            });
        }).catch(() => {
            this.setState({
                loadStatus: 'failed'
            });
        });
    }
}

import esriPromise, { esriBootstrap } from 'esri-promise';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Main from './components';

import '../css/index.scss';

const package_path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/"));
const dojoConfig = {
    async: true,
    locale: 'en-us',
    packages: [
        {
            name: "application-base-js",
            location: package_path + "/application-base-js",
            main: "bundle"
        },
        {
            name: "config",
            location: package_path + "/config"
        }
    ]
};
if (location.search.match(/locale=([\w-]+)/)) {
  dojoConfig.locale = RegExp.$1;
}

esriBootstrap('https://js.arcgis.com/4.4/', dojoConfig).then(() => {
    esriPromise([
        'dojo/text!config/appConfig.json',
        'dojo/text!config/baseConfig.json',
        'dojo/i18n!config/nls/resources',
        'application-base-js/ApplicationBase.js'
    ]).then(([appConfigJSON, baseConfigJSON, i18n, ApplicationBase]) => {
        const boilerplate = new ApplicationBase({ config: JSON.parse(appConfigJSON), settings: JSON.parse(baseConfigJSON) });
        ReactDOM.render(
            <Main boilerplate={boilerplate} i18n={i18n} />,
            document.getElementById('react-container')
        );
    });
});

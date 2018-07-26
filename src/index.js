import "./general.scss";

import "intl-pluralrules";
import "./drop-hint";
import * as serviceWorker from './service-worker';
import App from "./app";
import ErrorHandler from "./error-handler/component";
import React from "react";
import ReactDOM from "react-dom";
import smoothscroll from "smoothscroll-polyfill";

const appRoot = document.querySelector(`main`);
const errorsRoot = document.querySelector(`.errors`);

ReactDOM.render(<App/>, appRoot);
ReactDOM.render(<ErrorHandler/>, errorsRoot);

smoothscroll.polyfill();
serviceWorker.register({});

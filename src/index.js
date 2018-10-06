import "./general.scss";

import "intl-pluralrules";
import "./dropHint";
import * as serviceWorker from './serviceWorker';
import App from "./App";
import ErrorHandler from "./ErrorHandler/component";
import React from "react";
import ReactDOM from "react-dom";
import smoothscroll from "smoothscroll-polyfill";

const appRoot = document.querySelector(`main`);
const errorsRoot = document.querySelector(`.errors`);

ReactDOM.render(<App/>, appRoot);
ReactDOM.render(<ErrorHandler/>, errorsRoot);

smoothscroll.polyfill();
serviceWorker.register({});

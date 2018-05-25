import "./general.scss";

import * as serviceWorker from './service-worker';
import App from "./app";
import React from "react";
import ReactDOM from "react-dom";

const root = document.querySelector(`main`);

ReactDOM.render(<App/>, root);

serviceWorker.register();
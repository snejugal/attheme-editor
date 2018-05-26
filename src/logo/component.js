import "./styles.scss";

import { ReactComponent as LogoSVG } from "./logo.svg";
import React from "react";

class Logo extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  render () {
    return <LogoSVG className="logo"/>;
  }
}

export default Logo;
import "./styles.scss";

import { ReactComponent as LogoSVG } from "./logo.svg";
import PropTypes from "prop-types";
import React from "react";

class Logo extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }

  shouldComponentUpdate = ({ onClick }) => onClick !== this.props.onClick

  render () {
    return <LogoSVG className="logo" onClick={this.props.onClick}/>;
  }
}

export default Logo;

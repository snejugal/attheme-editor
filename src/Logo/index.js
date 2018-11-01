import "./styles.scss";

import { ReactComponent as LogoSVG } from "./logo.svg";
import PropTypes from "prop-types";
import React from "react";
import isEqual from "lodash/isEqual";

export default class Logo extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  render() {
    return <LogoSVG className="logo" onClick={this.props.onClick}/>;
  }
}

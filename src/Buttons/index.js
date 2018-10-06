import "./styles.scss";

import PropTypes from "prop-types";
import React from "react";

export default class Buttons extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: ``,
  }

  render () {
    let className = `buttons`;

    if (this.props.className) {
      className += ` ${this.props.className}`;
    }

    return <div className={className}>{this.props.children}</div>;
  }
}

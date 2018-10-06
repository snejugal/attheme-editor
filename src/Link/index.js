import "./styles.scss";

import PropTypes from "prop-types";
import React from "react";

export default class Link extends React.Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.any,
    isWhite: PropTypes.bool,
  }

  static defaultProps = {
    isWhite: false,
  }

  stopPropagation = (event) => event.stopPropagation()

  render () {
    let className = `link`;

    if (this.props.isWhite) {
      className += ` -white`;
    }

    return (
      <a
        className={className}
        href={this.props.href}
        onClick={this.stopPropagation}
        target="_blank"
        rel="noopener noreferrer"
      >
        {this.props.children}
      </a>
    );
  }
}

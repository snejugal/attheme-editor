import "./styles.scss";

import PropTypes from "prop-types";
import React from "react";

class Button extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    children: PropTypes.any,
    onClick: PropTypes.func.isRequired,
    isDangerous: PropTypes.bool,
  }

  static defaultProps = {
    type: `button`,
    isDangerous: false,
  }

  render () {
    let className = `button`;

    if (this.props.isDangerous) {
      className += ` -dangerous`;
    }

    return (
      <button
        type={this.props.type}
        className={className}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
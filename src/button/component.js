import "./styles.scss";

import PropTypes from "prop-types";
import React from "react";

class Button extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    children: PropTypes.any,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    type: `button`,
  }

  render () {
    return (
      <button
        type={this.props.type}
        className="button"
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
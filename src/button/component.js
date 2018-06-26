import "./styles.scss";

import PropTypes from "prop-types";
import React from "react";

class Button extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    children: PropTypes.any,
    onClick: PropTypes.func.isRequired,
    isDangerous: PropTypes.bool,
    isFloating: PropTypes.bool,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    backgroundColor: PropTypes.string,
  }

  static defaultProps = {
    type: `button`,
    isDangerous: false,
    isFloating: false,
    className: ``,
    isDisabled: false,
  }

  shouldComponentUpdate = (nextProps) => (
    nextProps.type !== this.props.type
    || nextProps.children !== this.props.children
    || nextProps.onClick !== this.props.onClick
    || nextProps.isDangerous !== this.props.isDangerous
    || nextProps.isFloating !== this.props.isFloating
    || nextProps.isDisabled !== this.props.isDisabled
    || nextProps.className !== this.props.className
  )

  render () {
    let className = `button`;

    if (this.props.isDangerous) {
      className += ` -dangerous`;
    }

    if (this.props.isFloating) {
      className += ` -floating`;
    }

    if (this.props.className) {
      className += ` ${this.props.className}`;
    }

    const styles = {};

    if (this.props.backgroundColor) {
      styles.backgroundColor = this.props.backgroundColor;
    }

    return (
      <button
        type={this.props.type}
        className={className}
        onClick={this.props.onClick}
        disabled={this.props.isDisabled}
        style={styles}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
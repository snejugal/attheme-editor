import "./styles.scss";

import React from "react";
import isEqual from "lodash/isEqual";

interface Props {
  type?: `button` | `reset` | `submit`;
  className?: string;
  children: React.ReactNode;
  onClick(): void;
  isDangerous?: boolean;
  isFloating?: boolean;
  isDisabled?: boolean;
  backgroundColor?: string;
}

export default class Button extends React.Component<Props> {
  static defaultProps = {
    type: `button`,
    isDangerous: false,
    isFloating: false,
    className: ``,
    isDisabled: false
  };

  shouldComponentUpdate(nextProps: Props) {
    return !isEqual(this.props, nextProps);
  }

  render() {
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

    return (
      <button
        type={this.props.type}
        className={className}
        onClick={this.props.onClick}
        disabled={this.props.isDisabled}
        style={{
          backgroundColor: this.props.backgroundColor
        }}
      >
        {this.props.children}
      </button>
    );
  }
}

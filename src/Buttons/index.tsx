import "./styles.scss";

import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default class Buttons extends React.Component<Props> {
  static defaultProps = {
    className: ``,
  };

  render() {
    let className = `buttons`;

    if (this.props.className) {
      className += ` ${this.props.className}`;
    }

    return <div className={className}>{this.props.children}</div>;
  }
}

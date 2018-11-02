import "./styles.scss";

import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default class Hint extends React.Component<Props> {
  static defaultProps = {
    className: ``,
  };

  render() {
    return (
      <p className={`paragraph hint ${this.props.className}`}>
        {this.props.children}
      </p>
    );
  }
}

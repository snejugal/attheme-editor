import "./styles.scss";

import React from "react";

interface Props {
  children: React.ReactNode;
  level: number;
  className?: string;
}

export default class Heading extends React.Component<Props> {
  static defaultProps = {
    className: ``,
  };

  render() {
    const Level = `h${this.props.level}`;

    return (
      <Level className={`heading ${this.props.className}`}>
        {this.props.children}
      </Level>
    );
  }
}

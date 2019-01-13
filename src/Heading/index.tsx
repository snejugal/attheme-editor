import "./styles.scss";

import React from "react";

// eslint-disable-next-line quotes
type Levels = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

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
    const Level = `h${this.props.level}` as Levels;

    return (
      <Level className={`heading ${this.props.className}`}>
        {this.props.children}
      </Level>
    );
  }
}

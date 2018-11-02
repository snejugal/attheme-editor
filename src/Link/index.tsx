import "./styles.scss";

import React from "react";

interface Props {
  href: string;
  children: React.ReactNode;
  isWhite?: boolean;
}

export default class Link extends React.Component<Props> {
  static defaultProps = {
    isWhite: false,
  };

  stopPropagation = (event: React.SyntheticEvent) => event.stopPropagation();

  render() {
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

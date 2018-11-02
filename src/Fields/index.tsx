import "./styles.scss";

import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default class Fields extends React.Component<Props> {
  static defaultProps = {
    className: ``,
  };

  render() {
    return (
      <div className={`fields ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
}

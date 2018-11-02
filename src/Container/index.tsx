import "./styles.scss";

import PropTypes from "prop-types";
import React from "react";

interface Props {
  children: React.ReactNode;
  containerRef: React.Ref<HTMLDivElement>;
  onScroll(): void;
}

export default class Container extends React.Component<Props> {
  static propTypes = {
    children: PropTypes.any,
    containerRef: PropTypes.any.isRequired,
    onScroll: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div
        className="container -outer"
        ref={this.props.containerRef}
        onScroll={this.props.onScroll}
      >
        <div className="container -inner">
          {this.props.children}
        </div>
      </div>
    );
  }
}

import "./styles.scss";

import PropTypes from "prop-types";
import React from "react";

export default class Container extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    containerRef: PropTypes.any.isRequired,
    onScroll: PropTypes.func.isRequired,
  }

  render () {
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

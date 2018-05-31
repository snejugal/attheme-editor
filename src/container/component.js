import "./styles.scss";

import PropTypes from "prop-types";
import React from "react";

class Container extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    containerRef: PropTypes.any.isRequired,
    onScroll: PropTypes.func.isRequired,
  }

  render () {
    return (
      <div
        className="container"
        ref={this.props.containerRef}
        onScroll={this.props.onScroll}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Container;
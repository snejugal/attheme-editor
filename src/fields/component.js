import "./styles.scss";

import PropTypes from "prop-types";
import React from "react";

class Fields extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: ``,
  }

  render () {
    return (
      <div className={`fields ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
}

export default Fields;
import "./styles.scss";

import PropTypes from "prop-types";
import React from "react";

class Hint extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: ``,
  }

  render () {
    return (
      <p className={`paragraph hint ${this.props.className}`}>
        {this.props.children}
      </p>
    );
  }
}

export default Hint;
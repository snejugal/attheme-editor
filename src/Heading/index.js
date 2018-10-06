import "./styles.scss";

import PropTypes from "prop-types";
import React from "react";

class Heading extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    level: PropTypes.number.isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: ``,
  }

  render () {
    const Level = `h${this.props.level}`;

    return (
      <Level className={`heading ${this.props.className}`}>
        {this.props.children}
      </Level>
    );
  }
}

export default Heading;

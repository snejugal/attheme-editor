import "./styles.scss";

import PropTypes from "prop-types";
import React from "react";

class Buttons extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  }

  render () {
    return <div className="buttons">{this.props.children}</div>;
  }
}

export default Buttons;
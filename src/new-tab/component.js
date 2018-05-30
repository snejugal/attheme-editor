import "./styles.scss";

import { ReactComponent as Icon } from "./icon.svg";
import PropTypes from "prop-types";
import React from "react";

class NewTab extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }

  render () {
    return (
      <button className="tabs_newTab" onClick={this.props.onClick}>
        <Icon/>
      </button>
    );
  }
}

export default NewTab;
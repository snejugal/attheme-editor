import "./styles.scss";

import { ReactComponent as Icon } from "./icon.svg";
import PropTypes from "prop-types";
import React from "react";

class NewTab extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
  }

  render () {
    let className = `tab -new`;

    if (this.props.isActive) {
      className += ` -active`;
    }

    return (
      <button className={className} onClick={this.props.onClick}>
        <Icon/>
      </button>
    );
  }
}

export default NewTab;
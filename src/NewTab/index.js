import "./styles.scss";

import { ReactComponent as Icon } from "./icon.svg";
import PropTypes from "prop-types";
import React from "react";
import isEqual from "lodash/isEqual";

export default class NewTab extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  render() {
    let className = `tab headerTab -new`;

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

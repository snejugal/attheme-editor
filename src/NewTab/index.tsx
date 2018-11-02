import "./styles.scss";

import { ReactComponent as Icon } from "./icon.svg";
import React from "react";
import isEqual from "lodash/isEqual";

interface Props {
  onClick(): void;
  isActive: boolean;
}

export default class NewTab extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
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

import "./styles.scss";

import { ReactComponent as LogoSVG } from "./logo.svg";
import React from "react";
import isEqual from "lodash/isEqual";

interface Props {
  onClick(): void;
}

export default class Logo extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return !isEqual(this.props, nextProps);
  }

  render() {
    return <LogoSVG className="logo" onClick={this.props.onClick}/>;
  }
}

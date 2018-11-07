import "./styles.scss";

import Heading from "../Heading";
import React from "react";
import localization from "../localization";

interface Props {
  errorStack: string;
  onDismissed(): void;
}

export default class ErrorElement extends React.Component<Props> {
  render() {
    return (
      <div className="error" onClick={this.props.onDismissed}>
        <Heading level={2} className="error_title">
          {localization.error.title}
        </Heading>
        <p className="paragraph error_description">
          {localization.error.description}
        </p>
        <pre className="error_stack">{this.props.errorStack}</pre>
        <p className="paragraph error_dismiss">
          {localization.error.dismiss}
        </p>
      </div>
    );
  }
}

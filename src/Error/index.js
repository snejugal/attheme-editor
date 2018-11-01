import "./styles.scss";

import Heading from "../Heading";
import PropTypes from "prop-types";
import React from "react";
import localization from "../localization";

export default class ErrorElement extends React.Component {
  static propTypes = {
    errorStack: PropTypes.string.isRequired,
    onDismissed: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="error" onClick={this.props.onDismissed}>
        <Heading level={2} className="error_title">
          {localization.error_title()}
        </Heading>
        <p className="paragraph error_description">
          {localization.error_description()}
        </p>
        <pre className="error_stack">{this.props.errorStack}</pre>
        <p className="paragraph error_dismiss">
          {localization.error_dismiss()}
        </p>
      </div>
    );
  }
}

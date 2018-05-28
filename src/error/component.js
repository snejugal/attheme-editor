import "./styles.scss";

import PropTypes from "prop-types";
import React from "react";
import localization from "../localization";

class ErrorElement extends React.Component {
  static propTypes = {
    errorStack: PropTypes.string.isRequired,
    onDismissed: PropTypes.func.isRequired,
  }

  render () {
    return (
      <div className="error" onClick={this.props.onDismissed}>
        <h2 className="title error_title">{localization.error_title()}</h2>
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

export default ErrorElement;
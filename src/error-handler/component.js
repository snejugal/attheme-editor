import "./styles.scss";

import ErrorElement from "../error/component";
import React from "react";

class ErrorHandler extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      errors: [],
    };
  }

  componentDidMount = () => {
    this.handler = ({ error: { stack }, timeStamp }) => {
      this.setState({
        errors: [
          ...this.state.errors,
          {
            stack,
            timeStamp,
          },
        ],
      });

      return true;
    };

    window.onerror = null;
    window.addEventListener(`error`, this.handler);
  }

  render () {
    if (this.state.errors.length === 0) {
      return null;
    }

    const errorMessages = this.state.errors.map((error, index) => {
      const { stack, timeStamp } = error;
      const handleDismissed = () => {
        const errors = [...this.state.errors];

        errors.splice(index, 1);
        this.setState({
          errors,
        });
      };

      return <ErrorElement
        errorStack={stack}
        key={timeStamp}
        onDismissed={handleDismissed}
      />;
    });

    return errorMessages;
  }
}

export default ErrorHandler;
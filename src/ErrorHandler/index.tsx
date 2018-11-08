import "./styles.scss";

import ErrorElement from "../Error";
import React from "react";

interface State {
  errors: {
    stack: string;
    timeStamp: number;
  }[],
}

export default class ErrorHandler extends React.Component<{}, State> {
  state: State = {
    errors: [],
  };

  handler = (event: ErrorEvent | PromiseRejectionEvent) => {
    let stack;

    const { timeStamp } = event;

    if (`error` in event) {
      ({ stack } = event.error);
    } else {
      ({ stack } = event.reason);
    }

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

  componentDidMount() {
    delete window.onerror;
    window.addEventListener(`error`, this.handler);
    window.addEventListener(`unhandledrejection`, this.handler);
  }

  render() {
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

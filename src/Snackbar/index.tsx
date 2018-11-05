import "./styles.scss";

import React from "react";
import ReactDOM from "react-dom";

const root = document.querySelector(`.snackbars`)!;

interface Props {
  children: React.ReactNode;
  timeout?: number;
  onDismiss(): void;
  isError?: boolean;
}

export default class Snackbar extends React.Component<Props> {
  state = {
    isDisappearing: false,
    isError: false,
  };

  snackbarWrapper: HTMLDivElement | null = null;

  constructor(props: Props) {
    super(props);

    this.snackbarWrapper = document.createElement(`div`);
    this.snackbarWrapper.className = `snackbarWrapper`;
    root.appendChild(this.snackbarWrapper);
  }

  handleAnimationEnd = () => {
    const { timeout } = this.props;

    if (timeout && 0 < timeout && timeout < Infinity) {
      setTimeout(this.hide, this.props.timeout);
    }
  };

  componentWillUnmount() {
    root.removeChild(this.snackbarWrapper!);
  }

  hide = () => this.setState({
    isDisappearing: true,
  });

  render() {
    let className = `snackbar`;

    if (this.props.isError) {
      className += ` -error`;
    }

    if (this.state.isDisappearing) {
      className += ` -disappearing`;
    }

    return ReactDOM.createPortal(
      <div
        className={className}
        onAnimationEnd={this.handleAnimationEnd} // When apeearing
        onTransitionEnd={this.props.onDismiss} // When disappearing
        onClick={this.hide}
      >
        {this.props.children}
      </div>,
      this.snackbarWrapper!,
    );
  }
}

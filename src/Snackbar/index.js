import "./styles.scss";

import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

const root = document.querySelector(`.snackbars`);

export default class Snackbar extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    timeout: PropTypes.number,
    onDismiss: PropTypes.func.isRequired,
    isError: PropTypes.bool,
  };

  state = {
    isDisappearing: false,
    isError: false,
  };

  constructor(props) {
    super(props);

    this.snackbarWrapper = document.createElement(`div`);
    this.snackbarWrapper.className = `snackbarWrapper`;
    root.appendChild(this.snackbarWrapper);
  }

  handleAnimationEnd = () => {
    if (this.props.timeout > 0 && this.props.timeout < Infinity) {
      setTimeout(this.hide, this.props.timeout);
    }
  };

  componentWillUnmount() {
    root.removeChild(this.snackbarWrapper);
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
      this.snackbarWrapper,
    );
  }
}

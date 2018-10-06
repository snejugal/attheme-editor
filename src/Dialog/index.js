import "./styles.scss";

import Button from "../Button";
import Buttons from "../Buttons";
import Heading from "../Heading";
import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

const root = document.querySelector(`.dialogContainer`);

export default class Dialog extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.any,
    buttons: PropTypes.arrayOf(PropTypes.shape({
      caption: PropTypes.any,
      onClick: PropTypes.func,
      shouldCloseAfterClick: PropTypes.bool,
      isDangerous: PropTypes.bool,
      isDisabled: PropTypes.bool,
    })).isRequired,
    onDismiss: PropTypes.func,
    onClose: PropTypes.func.isRequired,
  };

  state = {
    isClosing: false,
  };

  wasMouseDown = false;

  dialog = React.createRef();

  onRootClick = (event) => {
    if (event.target === root && this.wasMouseDown) {
      this.close();
    }

    this.wasMouseDown = false;
  };

  onRootMouseDown = (event) => {
    if (event.target === root) {
      this.wasMouseDown = true;
    }
  };

  onDocumentKeyDown = (event) => {
    if (event.key === `Escape`) {
      this.close();
    }
  };

  close = () => {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }

    this.setState({
      isClosing: true,
    });
  };

  handleRootTransitionEnd = ({ target }) => {
    if (target === this.dialog.current) {
      this.props.onClose();

      root.classList.remove(`-disappear`);
    }
  };

  handleButtonClick = (button) => {
    if (button.onClick) {
      button.onClick();
    }

    if (button.shouldCloseAfterClick) {
      this.close();
    }
  };

  componentDidMount = () => {
    window.history.pushState(null, document.title, window.location.href);

    root.addEventListener(`click`, this.onRootClick);
    root.addEventListener(`mousedown`, this.onRootMouseDown);
    window.addEventListener(`popstate`, this.close);
    document.body.addEventListener(`keydown`, this.onDocumentKeyDown);

    this.shouldRestoreTabIndex = Array.from(
      document.querySelectorAll(`main *`),
    );

    for (const element of this.shouldRestoreTabIndex) {
      element.tabIndex = -1;
    }
  };

  componentWillUnmount = () => {
    root.removeEventListener(`click`, this.onRootClick);
    root.removeEventListener(`mousedown`, this.onRootMouseDown);
    window.removeEventListener(`popstate`, this.close);
    document.body.removeEventListener(`keydown`, this.onDocumentKeyDown);

    for (const element of this.shouldRestoreTabIndex) {
      element.removeAttribute(`tabindex`);
    }
  };

  componentDidUpdate(oldProps, oldState) {
    if (this.state.isClosing && !oldState.isClosing) {
      root.classList.add(`-disappear`);
      root.addEventListener(`transitionend`, this.handleRootTransitionEnd);
    }
  }

  render () {
    return ReactDOM.createPortal(
      <dialog className="dialog" open={true} ref={this.dialog}>
        <div className="dialog_content">
          {this.props.title && (
            <Heading level={2} className="dialog_title">
              {this.props.title}
            </Heading>
          )}
          {this.props.children}
        </div>
        {`buttons` in this.props && (
          <Buttons className="dialog_buttons">
            {this.props.buttons.map((button) => (
              <Button
                key={button.caption}
                onClick={() => this.handleButtonClick(button)}
                isDangerous={button.isDangerous}
                isDisabled={button.isDisabled}
              >
                {button.caption}
              </Button>
            ))}
          </Buttons>
        )}
      </dialog>,
      root,
    );
  }
}

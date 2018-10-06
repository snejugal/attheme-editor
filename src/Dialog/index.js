import "./styles.scss";

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
    buttons: PropTypes.any,
    onDismiss: PropTypes.func.isRequired,
    onHide: PropTypes.func,
  };

  state = {
    isDisappearing: false,
  };

  wasMouseDown = false;

  dialog = React.createRef();

  onRootClick = (event) => {
    if (event.target === root && this.wasMouseDown) {
      this.hide();
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
      this.hide();
    }
  };

  hide = () => this.setState({
    isDisappearing: true,
  });

  handleRootTransitionEnd = ({ target }) => {
    if (target === this.dialog.current) {
      if (this.props.onHide) {
        this.props.onHide();
      } else {
        this.props.onDismiss();
      }

      root.classList.remove(`-disappear`);
    }
  };

  componentDidMount = () => {
    window.history.pushState(null, document.title, window.location.href);

    root.addEventListener(`click`, this.onRootClick);
    root.addEventListener(`mousedown`, this.onRootMouseDown);
    window.addEventListener(`popstate`, this.hide);
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
    window.removeEventListener(`popstate`, this.hide);
    document.body.removeEventListener(`keydown`, this.onDocumentKeyDown);

    for (const element of this.shouldRestoreTabIndex) {
      element.removeAttribute(`tabindex`);
    }
  };

  componentDidUpdate = () => {
    if (this.state.isDisappearing || this.props.onHide) {
      root.classList.add(`-disappear`);
      root.addEventListener(`transitionend`, this.handleRootTransitionEnd);
    }
  };

  render () {
    return ReactDOM.createPortal(
      <dialog
        className="dialog"
        open={true}
        ref={this.dialog}
      >
        <div className="dialog_content">
          {
            `title` in this.props
              ? (
                <Heading level={2} className="dialog_title">
                  {this.props.title}
                </Heading>
              )
              : null
          }
          {this.props.children}
        </div>
        {
          `buttons` in this.props
            ? <Buttons className="dialog_buttons">{this.props.buttons}</Buttons>
            : null
        }
      </dialog>,
      root,
    );
  }
}

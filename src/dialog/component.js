import "./styles.scss";

import Buttons from "../buttons/component";
import Heading from "../heading/component";
import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

const root = document.querySelector(`.dialogContainer`);

class Dialog extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.any,
    buttons: PropTypes.any,
    onDismiss: PropTypes.func.isRequired,
  }

  wasMouseDown = false;

  onRootClick = (event) => {
    if (event.target === root && this.wasMouseDown) {
      this.props.onDismiss(event);
    }

    this.wasMouseDown = false;
  }

  onRootMouseDown = (event) => {
    if (event.target === root) {
      this.wasMouseDown = true;
    }
  };

  onDocumentKeyDown = (event) => {
    if (event.key === `Escape`) {
      this.props.onDismiss(event);
    }
  };

  componentDidMount = () => {
    window.history.pushState(null, document.title, window.location.href);

    root.addEventListener(`click`, this.onRootClick);
    root.addEventListener(`mousedown`, this.onRootMouseDown);
    window.addEventListener(`popstate`, this.props.onDismiss);
    document.body.addEventListener(`keydown`, this.onDocumentKeyDown);
  };

  componentWillUnmount = () => {
    root.removeEventListener(`click`, this.onRootClick);
    root.removeEventListener(`mousedown`, this.onRootMouseDown);
    window.removeEventListener(`popstate`, this.props.onDismiss);
    document.body.removeEventListener(`keydown`, this.onDocumentKeyDown);
  };

  render () {
    return ReactDOM.createPortal(
      <dialog className="dialog" open={true}>
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

export default Dialog;
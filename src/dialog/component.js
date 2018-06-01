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

  onRootClick = (event) => {
    if (event.target === root) {
      this.props.onDismiss(event);
    }
  }

  componentDidMount = () => {
    root.addEventListener(`click`, this.onRootClick);
  }

  componentWillUnmount = () => {
    root.removeEventListener(`click`, this.onRootClick);
  }

  render () {
    return ReactDOM.createPortal(
      <div className="dialog">
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
        {
          `buttons` in this.props
            ? <Buttons className="dialog_buttons">{this.props.buttons}</Buttons>
            : null
        }
      </div>,
      root,
    );
  }
}

export default Dialog;
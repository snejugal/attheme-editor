import "./styles.scss";

import Button from "../Button";
import Buttons from "../Buttons";
import Heading from "../Heading";
import React from "react";
import ReactDOM from "react-dom";

const root = document.querySelector(`.dialogContainer`)!;

interface ButtonDescription {
  caption: React.ReactNode;
  onClick?(): void;
  shouldCloseAfterClick?: boolean;
  isDangerous?: boolean;
  isDisabled?: boolean;
}

interface Props {
  children: React.ReactNode;
  title?: React.ReactNode;
  buttons: ButtonDescription[];
  onDismiss?(): void;
  onClose(): void;
}

interface State {
  isClosing: boolean;
}

export default class Dialog extends React.Component<Props, State> {
  state = {
    isClosing: false,
  };

  wasMouseDown = false;

  restoreTabIndexOn: HTMLElement[] = [];

  dialog = React.createRef<HTMLDialogElement>();

  onRootClick = (event: Event) => {
    if (event.target === root && this.wasMouseDown) {
      this.close();
    }

    this.wasMouseDown = false;
  };

  onRootMouseDown = (event: Event) => {
    if (event.target === root) {
      this.wasMouseDown = true;
    }
  };

  onDocumentKeyDown = (event: KeyboardEvent) => {
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

  handleRootTransitionEnd = ({ target }: Event) => {
    if (target === this.dialog.current) {
      this.props.onClose();

      root.classList.remove(`-disappear`);
    }
  };

  handleButtonClick = (button: ButtonDescription) => {
    if (button.onClick) {
      button.onClick();
    }

    if (button.shouldCloseAfterClick) {
      this.close();
    }
  };

  componentDidMount() {
    window.history.pushState(null, document.title, window.location.href);

    root.addEventListener(`click`, this.onRootClick);
    root.addEventListener(`mousedown`, this.onRootMouseDown);
    window.addEventListener(`popstate`, this.close);
    document.body.addEventListener(`keydown`, this.onDocumentKeyDown);

    this.restoreTabIndexOn = Array.from(document.querySelectorAll(`main *`));

    for (const element of this.restoreTabIndexOn) {
      element.tabIndex = -1;
    }
  }

  componentWillUnmount() {
    root.removeEventListener(`click`, this.onRootClick);
    root.removeEventListener(`mousedown`, this.onRootMouseDown);
    window.removeEventListener(`popstate`, this.close);
    document.body.removeEventListener(`keydown`, this.onDocumentKeyDown);

    for (const element of this.restoreTabIndexOn) {
      element.removeAttribute(`tabindex`);
    }
  }

  componentDidUpdate(
    // @ts-ignore
    _,
    oldState: State,
  ) {
    if (this.state.isClosing && !oldState.isClosing) {
      root.classList.add(`-disappear`);
      root.addEventListener(`transitionend`, this.handleRootTransitionEnd);
    }
  }

  render() {
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
            {this.props.buttons.map(button => (
              <Button
                key={String(button.caption)}
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

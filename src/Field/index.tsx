import "./styles.scss";

import React from "react";

interface Props {
  type?: string;
  value: string | number;
  className?: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
  onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
  onEnter?(event: React.KeyboardEvent<HTMLInputElement>): void;
  id: string;
  children: React.ReactNode;
  autoCapitalize?: string;
  min?: number;
  max?: number;
  step?: number;
  autoFocus?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}

export default class Field extends React.Component<Props> {
  static defaultProps = {
    type: `text`,
    placeholder: ``,
    className: ``,
    autofocus: false,
    step: 1,
  };

  handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === `Enter` && this.props.onEnter) {
      this.props.onEnter(event);
    }
  };

  render() {
    return (
      <div className={`fieldContainer ${this.props.className}`}>
        <label className="label" htmlFor={this.props.id}>
          {this.props.children}
        </label>
        <input
          type={this.props.type}
          className={`field ${this.props.className}`}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          onKeyUp={this.handleKeyUp}
          id={this.props.id}
          value={this.props.value}
          autoCapitalize={this.props.autoCapitalize}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          onFocus={this.props.onFocus}
          autoFocus={this.props.autoFocus}
          ref={this.props.inputRef}
        />
      </div>
    );
  }
}

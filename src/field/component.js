import "./styles.scss";

import PropTypes from "prop-types";
import React from "react";

class Field extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onEnter: PropTypes.func,
    id: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    autoCapitalize: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    autoFocus: PropTypes.bool,
    inputRef: PropTypes.object,
  }

  static defaultProps = {
    type: `text`,
    placeholder: ``,
    className: ``,
    autofocus: false,
    step: 1,
  }

  handleKeyUp = (event) => {
    if (event.key === `Enter` && this.props.onEnter) {
      this.props.onEnter(event);
    }
  }

  render () {
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

export default Field;
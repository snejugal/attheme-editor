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
    onEnter: PropTypes.func,
    id: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    autoCapitalize: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
  }

  static defaultProps = {
    type: `text`,
    placeholder: ``,
    className: ``,
  }

  handleKeyUp = (event) => {
    if (event.key === `Enter` && this.props.onEnter) {
      this.props.onEnter(event);
    }
  }

  render () {
    return (
      <div className="fieldContainer">
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
        />
      </div>
    );
  }
}

export default Field;
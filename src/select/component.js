import "./styles.scss";

import PropTypes from "prop-types";
import React from "react";

class Select extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
    activeItem: PropTypes.string.isRequired,
  };

  handleChange = (event) => this.props.onChange(event.target.value);

  render () {
    return (
      <select
        className="select"
        onChange={this.handleChange}
        value={this.props.activeItem}
      >
        {
          this.props.items.map(({ id, title }) => (
            <option
              className="select_option"
              value={id}
              key={id}
            >
              {title}
            </option>
          ))
        }
      </select>
    );
  }
}

export default Select;
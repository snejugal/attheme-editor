import "./styles.scss";

import React from "react";

interface Props {
  items: {
    id: string;
    title: string;
  }[];
  onChange(id: string): void;
  activeItem: string;
}

export default class Select extends React.Component<Props> {
  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    this.props.onChange(event.target.value);

  render() {
    return (
      <select
        className="select"
        onChange={this.handleChange}
        value={this.props.activeItem}
      >
        {this.props.items.map(({ id, title }) => (
          <option className="select_option" value={id} key={id}>
            {title}
          </option>
        ))}
      </select>
    );
  }
}

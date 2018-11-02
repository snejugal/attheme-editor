import "./styles.scss";

import React from "react";

interface Props {
  tabs: {
    text: string;
    id: string;
  }[];
  activeTab: string;
  onChange(id: string): void;
  className?: string;
}

export default class Tabs extends React.Component<Props> {
  static defaultProps = {
    className: ``,
  };

  render() {
    return (
      <div className={`tabs ${this.props.className}`}>
        {this.props.tabs.map(({ text, id }) => {
          const handleClick = () => this.props.onChange(id);

          let className = `tab`;

          if (id === this.props.activeTab) {
            className += ` -active`;
          }

          return (
            <button className={className} onClick={handleClick} key={id}>
              {text}
            </button>
          );
        })}
      </div>
    );
  }
}

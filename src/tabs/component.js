import "./styles.scss";

import PropTypes from "prop-types";
import React from "react";

class Tabs extends React.Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeTab: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: ``,
  };

  render () {
    return (
      <div className={`tabs ${this.props.className}`}>
        {
          this.props.tabs.map(({ text, id }) => {
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
          })
        }
      </div>
    );
  }
}

export default Tabs;
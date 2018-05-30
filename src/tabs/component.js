import NewTab from "../new-tab/component";
import PropTypes from "prop-types";
import React from "react";

class Tabs extends React.Component {
  static propTypes = {
    workplaces: PropTypes.array.isRequired,
    activeTab: PropTypes.number,
  }

  handleNewTabClick = () => {
    // TODO
  }

  render () {
    return (
      <div className="tabs">
        <NewTab
          isActive={this.props.activeTab === -1}
          onClick={this.handleNewTabClick}
        />
      </div>
    );
  }
}

export default Tabs;
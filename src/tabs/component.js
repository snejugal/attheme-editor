import "./styles.scss";

import NewTab from "../new-tab/component";
import PropTypes from "prop-types";
import React from "react";
import Tab from "../tab/component";

class Tabs extends React.Component {
  static propTypes = {
    workplaces: PropTypes.array.isRequired,
    activeTab: PropTypes.number,
    onActiveTabChange: PropTypes.func.isRequired,
    activeTabRef: PropTypes.object.isRequired,
  }

  handleNewTabClick = () => this.props.onActiveTabChange(-1);

  render () {
    return (
      <div className="tabs">
        {
          this.props.workplaces.map((themeId) => {
            const ref = {};

            if (this.props.activeTab === themeId) {
              ref.ref = this.props.activeTabRef;
            }

            return <Tab
              id={themeId}
              key={themeId}
              isActive={this.props.activeTab === themeId}
              onClick={() => this.props.onActiveTabChange(themeId)}
              {...ref}
            />;
          })
        }
        <NewTab
          isActive={this.props.activeTab === -1}
          onClick={this.handleNewTabClick}
        />
      </div>
    );
  }
}

export default Tabs;
import "./styles.scss";

import HeaderTab from "../header-tab/component";
import NewTab from "../new-tab/component";
import PropTypes from "prop-types";
import React from "react";

class HeaderTabs extends React.Component {
  static propTypes = {
    workplaces: PropTypes.array.isRequired,
    activeTab: PropTypes.number,
    onActiveTabChange: PropTypes.func.isRequired,
    activeTabRef: PropTypes.object.isRequired,
  }

  tabs = React.createRef()

  handleNewTabClick = () => this.props.onActiveTabChange(-1);

  handleWheel = (event) => {
    if (event.deltaX) {
      return;
    }

    event.preventDefault();
    this.tabs.current.scrollBy({
      left: event.deltaY,
      behavior: `smooth`,
    });
  }

  render () {
    return (
      <div className="headerTabs" onWheel={this.handleWheel} ref={this.tabs}>
        {
          this.props.workplaces.map((themeId) => {
            const ref = {};

            if (this.props.activeTab === themeId) {
              ref.ref = this.props.activeTabRef;
            }

            return <HeaderTab
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

export default HeaderTabs;
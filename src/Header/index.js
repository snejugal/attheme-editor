import "./styles.scss";

import HeaderTabs from "../HeaderTabs";
import Logo from "../Logo";
import PropTypes from "prop-types";
import React from "react";

export default class Header extends React.Component {
  static propTypes = {
    workplaces: PropTypes.array.isRequired,
    activeTab: PropTypes.number,
    onActiveTabChange: PropTypes.func.isRequired,
    activeTabRef: PropTypes.object.isRequired,
    onLogoClick: PropTypes.func.isRequired,
  }

  render () {
    return (
      <header className="header">
        <Logo onClick={this.props.onLogoClick}/>
        <HeaderTabs
          workplaces={this.props.workplaces}
          activeTab={this.props.activeTab}
          onActiveTabChange={this.props.onActiveTabChange}
          activeTabRef={this.props.activeTabRef}
        />
      </header>
    );
  }
}

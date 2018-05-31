import "./styles.scss";

import Logo from "../logo/component";
import PropTypes from "prop-types";
import React from "react";
import Tabs from "../tabs/component";

class Header extends React.Component {
  static propTypes = {
    workplaces: PropTypes.array.isRequired,
    activeTab: PropTypes.number,
    onActiveTabChange: PropTypes.func.isRequired,
    activeTabRef: PropTypes.object.isRequired,
  }

  render () {
    return (
      <header className="header">
        <Logo/>
        <Tabs
          workplaces={this.props.workplaces}
          activeTab={this.props.activeTab}
          onActiveTabChange={this.props.onActiveTabChange}
          activeTabRef={this.props.activeTabRef}
        />
      </header>
    );
  }
}

export default Header;
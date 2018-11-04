import "./styles.scss";

import HeaderTab from "../HeaderTab";
import HeaderTabs from "../HeaderTabs";
import Logo from "../Logo";
import React from "react";

interface Props {
  workplaces: number[];
  activeTab: number | null;
  onActiveTabChange(tab: number): void;
  activeTabRef: React.Ref<HeaderTab>,
  onLogoClick(): void;
}

export default class Header extends React.Component<Props> {
  render() {
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

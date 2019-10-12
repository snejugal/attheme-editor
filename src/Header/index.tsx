import "./styles.scss";

import HeaderTab from "../HeaderTab";
import HeaderTabs from "../HeaderTabs";
import Logo from "../Logo";
import React from "react";

interface Props {
  workspaces: number[];
  activeTab: number | null;
  onActiveTabChange(tab: number): void;
  onWorkspacesChange(workspaces: number[]): void;
  activeTabRef: React.Ref<HeaderTab>;
  onLogoClick(): void;
}

export default class Header extends React.Component<Props> {
  render() {
    return (
      <header className="header">
        <Logo onClick={this.props.onLogoClick} />
        <HeaderTabs
          workspaces={this.props.workspaces}
          activeTab={this.props.activeTab}
          onActiveTabChange={this.props.onActiveTabChange}
          onWorkspacesChange={this.props.onWorkspacesChange}
          activeTabRef={this.props.activeTabRef}
        />
      </header>
    );
  }
}

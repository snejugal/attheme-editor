import "./styles.scss";

import HeaderTab from "../HeaderTab";
import NewTab from "../NewTab";
import React from "react";

interface Props {
  workplaces: number[];
  activeTab: number | null;
  onActiveTabChange(tab: number): void;
  activeTabRef: React.Ref<HeaderTab>,
}

export default class HeaderTabs extends React.Component<Props> {
  tabs = React.createRef<HTMLDivElement>();

  handleNewTabClick = () => this.props.onActiveTabChange(-1);

  handleWheel = (event: React.WheelEvent) => {
    if (event.deltaX) {
      return;
    }

    event.preventDefault();
    this.tabs.current!.scrollBy({
      left: event.deltaY,
      behavior: `smooth`,
    });
  };

  render() {
    return (
      <div
        className="tabs headerTabs"
        onWheel={this.handleWheel}
        ref={this.tabs}
      >
        {this.props.workplaces.map((themeId) => {
          return <HeaderTab
            id={themeId}
            key={themeId}
            isActive={this.props.activeTab === themeId}
            onClick={() => this.props.onActiveTabChange(themeId)}
            ref={this.props.activeTabRef}
          />;
        })}
        <NewTab
          isActive={this.props.activeTab === -1}
          onClick={this.handleNewTabClick}
        />
      </div>
    );
  }
}

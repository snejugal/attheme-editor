import "./styles.scss";

import HeaderTab from "../HeaderTab";
import NewTab from "../NewTab";
import React from "react";

interface Props {
  workspaces: number[];
  activeTab: number | null;
  onActiveTabChange(tab: number): void;
  activeTabRef: React.Ref<HeaderTab>;
}

export default class HeaderTabs extends React.Component<Props> {
  handleNewTabClick = () => this.props.onActiveTabChange(-1);

  scrolledHorizontallyAt = 0;

  handleWheel = (event: React.WheelEvent) => {
    if (event.deltaX) {
      this.scrolledHorizontallyAt = event.timeStamp;
      return;
    }

    event.preventDefault();

    if (Math.abs(this.scrolledHorizontallyAt - event.timeStamp) <= 1) {
      return;
    }

    let multiplier;

    if (event.deltaMode === 0) {
      multiplier = 3;
    } else if (event.deltaMode === 1) {
      multiplier = 50;
    } else {
      multiplier = 150 / window.innerHeight;
    }

    event.currentTarget.scrollBy({
      left: event.deltaY * multiplier,
      behavior: `smooth`,
    });
  };

  render() {
    return (
      <div className="tabs headerTabs" onWheel={this.handleWheel}>
        {this.props.workspaces.map(themeId => {
          return (
            <HeaderTab
              id={themeId}
              key={themeId}
              isActive={this.props.activeTab === themeId}
              onClick={() => this.props.onActiveTabChange(themeId)}
              ref={this.props.activeTabRef}
            />
          );
        })}
        <NewTab
          isActive={this.props.activeTab === -1}
          onClick={this.handleNewTabClick}
        />
      </div>
    );
  }
}

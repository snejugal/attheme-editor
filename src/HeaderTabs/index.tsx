import "./styles.scss";

import HeaderTab from "../HeaderTab";
import NewTab from "../NewTab";
import React from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

interface Props {
  workspaces: number[];
  activeTab: number | null;
  onActiveTabChange(tab: number): void;
  onWorkspacesChange(workspaces: number[]): void;
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

  handleDragEnd = ({ source, destination }: DropResult) => {
    if (!destination || source.index === destination.index) {
      return;
    }

    const newWorkspaces = [...this.props.workspaces];
    const [draggedWorkspace] = newWorkspaces.splice(source.index, 1);
    newWorkspaces.splice(destination.index, 0, draggedWorkspace);

    this.props.onWorkspacesChange(newWorkspaces);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Droppable droppableId="header" direction="horizontal">
          {provided => (
            <div
              {...provided.droppableProps}
              className="tabs headerTabs"
              onWheel={this.handleWheel}
              ref={provided.innerRef}
            >
              {this.props.workspaces.map((themeId, index) => {
                const isActive = this.props.activeTab === themeId;

                return (
                  <HeaderTab
                    id={themeId}
                    key={themeId}
                    index={index}
                    isActive={isActive}
                    onClick={() => this.props.onActiveTabChange(themeId)}
                    ref={isActive ? this.props.activeTabRef : null}
                  />
                );
              })}
              {provided.placeholder}
              <NewTab
                isActive={this.props.activeTab === -1}
                onClick={this.handleNewTabClick}
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

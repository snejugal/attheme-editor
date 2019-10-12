import "./styles.scss";

import * as database from "../database";
import React from "react";
import Spinner from "../Spinner";
import { Draggable } from "react-beautiful-dnd";
import classNames from "classnames";

interface Props {
  id: number;
  index: number;
  isActive: boolean;
  onClick(): void;
}

interface State {
  title: string | null;
}

export default class Tab extends React.Component<Props, State> {
  state: State = {
    title: null,
  };

  async componentDidMount() {
    const { name } = await database.getTheme(this.props.id);

    this.setState({
      title: name,
    });
  }

  updateTitle = (title: string) =>
    this.setState({
      title,
    });

  render() {
    return (
      <Draggable
        draggableId={String(this.props.id)}
        index={this.props.index}
        disableInteractiveElementBlocking={true}
      >
        {(provided, { isDragging }) => (
          <button
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={classNames(`tab`, `headerTab`, {
              "-active": this.props.isActive,
              "-dragging": isDragging,
            })}
            onClick={this.props.onClick}
          >
            <h3 className="headerTab_title">
              {typeof this.state.title === `string` ? (
                <pre>{this.state.title}</pre>
              ) : (
                <Spinner />
              )}
            </h3>
          </button>
        )}
      </Draggable>
    );
  }
}

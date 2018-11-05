import "./styles.scss";

import * as database from "../database";
import React from "react";
import Spinner from "../Spinner";

interface Props {
  id: number;
  isActive: boolean;
  onClick(): void;
}

interface State {
  title: string | null;
}

export default class Tab extends React.Component<Props> {
  state: State = {
    title: null,
  };

  async componentDidMount() {
    const { name } = await database.getTheme(this.props.id);

    this.setState({
      title: name,
    });
  }

  updateTitle = (title: string) => this.setState({
    title,
  });

  render() {
    let className = `tab headerTab`;

    if (this.props.isActive) {
      className += ` -active`;
    }

    return (
      <button className={className} onClick={this.props.onClick}>
        <h3 className="headerTab_title">
          {typeof this.state.title === `string`
            ? this.state.title
            : <Spinner/>}
        </h3>
      </button>
    );
  }
}

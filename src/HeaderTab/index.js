import "./styles.scss";

import * as database from "../database/";
import PropTypes from "prop-types";
import React from "react";
import Spinner from "../Spinner";

export default class Tab extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  state = {
    title: null,
  };

  componentDidMount = async () => {
    const { name } = await database.getTheme(this.props.id);

    this.setState({
      title: name,
    });
  }

  updateTitle = (title) => this.setState({
    title,
  });

  render () {
    let className = `tab headerTab`;

    if (this.props.isActive) {
      className += ` -active`;
    }

    return (
      <button className={className} onClick={this.props.onClick}>
        <h3 className="headerTab_title">
          {
            typeof this.state.title === `string`
              ? this.state.title
              : <Spinner/>
          }
        </h3>
      </button>
    );
  }
}

import "./styles.scss";

import * as database from "../database/api";
import PropTypes from "prop-types";
import React from "react";

class Tab extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);

    this.state = {
      title: ``,
    };
  }

  componentDidMount = async () => {
    const { name } = await database.getTheme(this.props.id);

    this.setState({
      title: name,
    });
  }

  updateTitle = (title) => {
    this.setState({
      title,
    });
  }

  render () {
    let className = `tab headerTab`;

    if (this.props.isActive) {
      className += ` -active`;
    }

    return (
      <button className={className} onClick={this.props.onClick}>
        <h3 className="headerTab_title">{this.state.title}</h3>
      </button>
    );
  }
}

export default Tab;
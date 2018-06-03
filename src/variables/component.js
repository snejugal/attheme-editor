import "./styles.scss";

import PropTypes from "prop-types";
import React from "react";
import Variable from "../variable/component";

class Variables extends React.Component {
  static propTypes = {
    themeId: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
    wallpaper: PropTypes.string,
    onClick: PropTypes.func.isRequired,
  }

  shouldComponentUpdate = ({ theme }) => theme !== this.props.theme

  render () {
    const variablesOrder = Object.keys(this.props.theme);
    const variables = [];

    if (this.props.wallpaper && !this.props.theme.chat_wallpaper) {
      const variableElement = <Variable
        variableName="chat_wallpaper"
        key="chat_wallpaper"
        wallpaper={this.props.wallpaper}
        onClick={this.props.onClick}
      />;

      variables.push(variableElement);
    }

    for (const variableName of variablesOrder) {
      if (variableName === `chat_wallpaper` && this.props.wallpaper) {
        continue;
      }

      const variableElement = <Variable
        variableName={variableName}
        key={variableName}
        color={this.props.theme[variableName]}
        onClick={this.props.onClick}
      />;

      variables.push(variableElement);
    }

    return <div className="variables">{variables}</div>;
  }
}

export default Variables;
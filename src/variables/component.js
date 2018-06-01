import "./styles.scss";

import PropTypes from "prop-types";
import React from "react";
import Variable from "../variable/component";

class Variables extends React.Component {
  static propTypes = {
    themeId: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
    wallpaper: PropTypes.string,
  }

  shouldComponentUpdate = ({ theme }) => theme !== this.props.theme

  render () {
    const variablesOrder = Object.keys(this.props.theme);
    const variables = [];

    if (this.props.wallpaper) {
      const variableElement = <Variable
        variableName="chat_wallpaper"
        key="chat_wallpaper"
        wallpaper={this.props.wallpaper}

        // we may meet both color and image at the same time in a theme,
        // respecting it
        color={this.props.theme.chat_wallpaper}
      />;

      variables.push(variableElement);
    }

    for (const variableName of variablesOrder) {
      const variableElement = <Variable
        variableName={variableName}
        key={variableName}
        color={this.props.theme[variableName]}
      />;

      variables.push(variableElement);
    }

    return <div className="variables">{variables}</div>;
  }
}

export default Variables;
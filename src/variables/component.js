import "./styles.scss";

import FuzzySearch from "fuzzy-search";
import PropTypes from "prop-types";
import React from "react";
import Variable from "../variable/component";
import { variables as allVariables } from "../attheme-variables";
import defaultValues from "attheme-default-values";

class Variables extends React.Component {
  static propTypes = {
    themeId: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
    wallpaper: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    onNewVariable: PropTypes.func.isRequired,
    displayAll: PropTypes.bool.isRequired,
    searchQuery: PropTypes.string,
  }

  shouldComponentUpdate = (newProps) => (
    newProps.theme !== this.props.theme
    || newProps.displayAll !== this.props.displayAll
    || newProps.searchQuery !== this.props.searchQuery
  )

  render () {
    const themeVariables = Object.keys(this.props.theme);

    let variablesOrder = [];

    if (this.props.displayAll) {
      for (const variableName of allVariables) {
        if (variableName === `chat_wallpaper` && this.props.wallpaper) {
          continue;
        }

        if (!this.props.theme[variableName]) {
          variablesOrder.push(variableName);
        }
      }
    }

    if (this.props.wallpaper && !this.props.theme.chat_wallpaper) {
      if (!themeVariables.includes(`chat_wallpaper`)) {
        variablesOrder.push(`chat_wallpaper`);
      }
    }

    variablesOrder.push(...themeVariables);

    if (this.props.searchQuery && this.props.searchQuery !== `*`) {
      const searcher = new FuzzySearch(variablesOrder, [], {
        sort: true,
      });

      variablesOrder = searcher.search(this.props.searchQuery);
    }

    const variables = [];

    for (const variableName of variablesOrder) {
      let variableElement;

      if (variableName === `chat_wallpaper` && this.props.wallpaper) {
        variableElement = <Variable
          variableName="chat_wallpaper"
          key="chat_wallpaper"
          wallpaper={this.props.wallpaper}
          onClick={this.props.onClick}
        />;
      } else if (themeVariables.includes(variableName)) {
        variableElement = <Variable
          variableName={variableName}
          key={variableName}
          color={this.props.theme[variableName]}
          onClick={this.props.onClick}
        />;
      } else {
        variableElement = <Variable
          variableName={variableName}
          key={variableName}
          color={defaultValues[variableName]}
          onClick={this.props.onNewVariable}
          isUnadded={true}
        />;
      }

      variables.push(variableElement);
    }

    return <div className="variables">{variables}</div>;
  }
}

export default Variables;
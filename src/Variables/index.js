import "./styles.scss";

import { allVariables, defaultValues } from "../atthemeVariables";
import Color from "@snejugal/color";
import Field from "../Field";
import FuzzySearch from "fuzzy-search";
import Hint from "../Hint";
import PropTypes from "prop-types";
import React from "react";
import Variable from "../Variable";
import localization from "../localization";
import isEqual from "lodash/isEqual";

const isMac = navigator.platform.toLowerCase().startsWith(`mac`);

export default class Variables extends React.Component {
  static propTypes = {
    themeId: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
    wallpaper: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    onNewVariable: PropTypes.func.isRequired,
    isSearchHotkeyEnabled: PropTypes.bool,
  };

  static defaultProps = {
    isSearchHotkeyEnabled: true,
  };

  searchInput = React.createRef();

  state = {
    searchQuery: ``,
  };

  isCtrlPressed = false;

  handleKeyDown = (event) => {
    if (!this.props.isSearchHotkeyEnabled) {
      return;
    }

    if ((isMac && event.metaKey) || (!isMac && event.ctrlKey)) {
      this.isCtrlPressed = true;
    }

    if (this.isCtrlPressed && event.code === `KeyF`) {
      event.preventDefault();
      this.searchInput.current.focus();
    }
  };

  handleKeyUp = (event) => {
    if (!this.props.isSearchHotkeyEnabled) {
      return;
    }

    if (
      (isMac && event.key === `Meta`)
      || (!isMac && event.key === `Control`)
    ) {
      this.isCtrlPressed = false;
    }
  }

  componentDidMount() {
    document.body.addEventListener(`keydown`, this.handleKeyDown);
    document.body.addEventListener(`keyup`, this.handleKeyUp);
  }

  componentWillUnmount() {
    document.body.removeEventListener(`keydown`, this.handleKeyDown);
    document.body.removeEventListener(`keyup`, this.handleKeyUp);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  handleSearchChange = (event) => this.setState({
    searchQuery: event.target.value,
  });

  render() {
    const themeVariables = Object.keys(this.props.theme);
    const query = this.state.searchQuery.trim();

    let variablesOrder = [];

    if (query !== ``) {
      for (const variableName of allVariables) {
        if (variableName === `chat_wallpaper` && this.props.wallpaper) {
          continue;
        }

        if (!this.props.theme[variableName]) {
          variablesOrder.push(variableName);
        }
      }
    }

    if (this.props.wallpaper && !themeVariables.includes(`chat_wallpaper`)) {
      variablesOrder.push(`chat_wallpaper`);
    }

    variablesOrder.push(...themeVariables);

    if (query) {
      if (query.startsWith(`#`)) {
        const parsedSearchHex = Color.parseHex(query);

        const searchHex = parsedSearchHex
          ? Color.createHex(parsedSearchHex)
          : query;

        variablesOrder = variablesOrder.filter((variable) => {
          const color = this.props.theme[variable] || defaultValues[variable];
          const variableHex = Color.createHex(color);

          return variableHex.startsWith(searchHex);
        });
      } else if (query !== `*`) {
        const searcher = new FuzzySearch(variablesOrder, [], {
          sort: true,
        });

        variablesOrder = searcher.search(query);
      }
    }

    const variables = variablesOrder.map((variableName) => {
      if (variableName === `chat_wallpaper` && this.props.wallpaper) {
        return <Variable
          variableName="chat_wallpaper"
          key="chat_wallpaper"
          wallpaper={this.props.wallpaper}
          onClick={this.props.onClick}
        />;
      }

      if (themeVariables.includes(variableName)) {
        return <Variable
          variableName={variableName}
          key={variableName}
          color={this.props.theme[variableName]}
          onClick={this.props.onClick}
        />;
      }

      return <Variable
        variableName={variableName}
        key={variableName}
        color={defaultValues[variableName]}
        onClick={this.props.onNewVariable}
        isUnadded={true}
      />;
    });

    return <>
      <Field
        type="search"
        id="workspace_search"
        value={this.state.searchQuery}
        onChange={this.handleSearchChange}
        inputRef={this.searchInput}
      >
        {localization.workspace_search()}
      </Field>
      {variables.length > 0 && (
        <div className="variables">{variables}</div>
      )}
      {variables.length === 0
        && this.state.searchQuery.trim() === ``
        && (
          <Hint className="variables_placeholder">
            {localization.workspace_noVariablesPlaceholder()}
          </Hint>
        )}
      {variables.length === 0
        && this.state.searchQuery.trim() !== ``
        && (
          <Hint className="variables_placeholder">
            {localization.workspace_noResultsPlaceholder()}
          </Hint>
        )}
    </>;
  }
}

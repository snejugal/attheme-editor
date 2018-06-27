import "./styles.scss";

import { allVariables, defaultValues } from "../attheme-variables";
import Color from "../color";
import Field from "../field/component";
import FuzzySearch from "fuzzy-search";
import Hint from "../hint/component";
import PropTypes from "prop-types";
import React from "react";
import Variable from "../variable/component";
import localization from "../localization";

const isMac = navigator.platform.toLowerCase().startsWith(`mac`);

class Variables extends React.Component {
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
  }

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

  componentDidMount = () => {
    document.body.addEventListener(`keydown`, this.handleKeyDown);
    document.body.addEventListener(`keyup`, this.handleKeyUp);
  };

  componentWillUnmount = () => {
    document.body.removeEventListener(`keydown`, this.handleKeyDown);
    document.body.removeEventListener(`keyup`, this.handleKeyUp);
  }

  shouldComponentUpdate = (newProps, newState) => (
    newProps.theme !== this.props.theme
    || newProps.wallpaper !== this.props.wallpaper
    || newProps.onClick !== this.props.onClick
    || newProps.onNewVariable !== this.props.onNewVariable
    || newProps.isSearchHotkeyEnabled !== this.props.isSearchHotkeyEnabled
    || newState !== this.state
  );

  handleSearchChange = (event) => this.setState({
    searchQuery: event.target.value,
  });

  render () {
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

    if (this.props.wallpaper && !this.props.theme.chat_wallpaper) {
      if (!themeVariables.includes(`chat_wallpaper`)) {
        variablesOrder.push(`chat_wallpaper`);
      }
    }

    variablesOrder.push(...themeVariables);

    if (query && query !== `*`) {
      let variablesOrderFS = [];

      const searcher = new FuzzySearch(variablesOrder, [], {
        sort: true,
      });

      variablesOrderFS = searcher.search(query);

      for (const variable of variablesOrder) {
        if (variablesOrderFS.includes(variable)) {
          continue;
        }

        const search = Color.parseHex(query)
          ? Color.createHex(Color.parseHex(query))
          : query;

        if (
          themeVariables.includes(variable)
          && this.props.theme[variable]
          && Color.createHex(this.props.theme[variable]).startsWith(search)
        ) {
          variablesOrderFS.push(variable);
        } else if (
          defaultValues[variable]
          && Color.createHex(defaultValues[variable]).startsWith(search)
        ) {
          variablesOrderFS.push(variable);
        }
        variablesOrder = variablesOrderFS;
      }
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

    return (
      <React.Fragment>
        <Field
          type="search"
          id="workspace_search"
          value={this.state.searchQuery}
          onChange={this.handleSearchChange}
          inputRef={this.searchInput}
        >
          {localization.workspace_search()}
        </Field>
        {
          variables.length > 0 && (
            <div className="variables">{variables}</div>
          )
        }
        {
          variables.length === 0
          && this.state.searchQuery.trim() === ``
          && (
            <Hint className="variables_placeholder">
              {localization.workspace_noVariablesPlaceholder()}
            </Hint>
          )
        }
        {
          variables.length === 0
          && this.state.searchQuery.trim() !== ``
          && (
            <Hint className="variables_placeholder">
              {localization.workspace_noResultsPlaceholder()}
            </Hint>
          )
        }
      </React.Fragment>
    );
  }
}

export default Variables;
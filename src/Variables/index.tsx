import "./styles.scss";

import VARIABLES from "attheme-js/lib/variables";
import { defaultValues, getRemovedVariables } from "../atthemeVariables";
import { parseHex, createHex } from "@snejugal/color";
import Field from "../Field";
import FuzzySearch from "fuzzy-search";
import Hint from "../Hint";
import PropTypes from "prop-types";
import React from "react";
import Variable from "../Variable";
import localization from "../localization";
import isEqual from "lodash/isEqual";
import { Color } from "attheme-js/lib/types";

const isMac = navigator.platform.toLowerCase().startsWith(`mac`);

interface Props {
  themeId: number;
  theme: { [key: string]: Color };
  wallpaper?: string;
  onClick(variable: string): void;
  onNewVariable(variable: string): void;
  isSearchHotkeyEnabled?: boolean;
}

interface State {
  searchQuery: string;
}

export default class Variables extends React.Component<Props, State> {
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

  searchInput = React.createRef<HTMLInputElement>();

  state: State = {
    searchQuery: ``,
  };

  isCtrlPressed = false;

  handleKeyDown = (event: KeyboardEvent) => {
    if (!this.props.isSearchHotkeyEnabled) {
      return;
    }

    if ((isMac && event.metaKey) || (!isMac && event.ctrlKey)) {
      this.isCtrlPressed = true;
    }

    if (this.isCtrlPressed && event.code === `KeyF`) {
      event.preventDefault();
      this.searchInput.current!.focus();
    }
  };

  handleKeyUp = (event: KeyboardEvent) => {
    if (!this.props.isSearchHotkeyEnabled) {
      return;
    }

    if (
      (isMac && event.key === `Meta`) ||
      (!isMac && event.key === `Control`)
    ) {
      this.isCtrlPressed = false;
    }
  };

  componentDidMount() {
    document.body.addEventListener(`keydown`, this.handleKeyDown);
    document.body.addEventListener(`keyup`, this.handleKeyUp);
  }

  componentWillUnmount() {
    document.body.removeEventListener(`keydown`, this.handleKeyDown);
    document.body.removeEventListener(`keyup`, this.handleKeyUp);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchQuery: event.target.value,
    });
  };

  render() {
    const themeVariables = Object.keys(this.props.theme);
    const query = this.state.searchQuery.trim();

    let variablesOrder: string[] = [];

    if (query !== ``) {
      for (const variableName of VARIABLES) {
        if (variableName === `chat_wallpaper` && this.props.wallpaper) {
          continue;
        }

        if (!this.props.theme[variableName]) {
          variablesOrder.push(variableName);
        }
      }
    }

    if (themeVariables.includes(`chat_wallpaper`) || this.props.wallpaper) {
      variablesOrder.push(`chat_wallpaper`);
    }

    variablesOrder.push(...themeVariables);

    if (query) {
      if (query.startsWith(`#`)) {
        const parsedSearchHex = parseHex(query);

        const searchHex = parsedSearchHex ? createHex(parsedSearchHex) : query;

        variablesOrder = variablesOrder.filter(variable => {
          const color = this.props.theme[variable] || defaultValues[variable];
          const variableHex = createHex(color);

          return variableHex.startsWith(searchHex);
        });
      } else if (query !== `*`) {
        const searcher = new FuzzySearch(variablesOrder, [], {
          sort: true,
        });

        variablesOrder = searcher.search(query);
      }
    }

    if (variablesOrder.includes(`chat_wallpaper_gradient_to`)) {
      const index = variablesOrder.indexOf(`chat_wallpaper_gradient_to`);

      variablesOrder.splice(index, 1);

      if (!variablesOrder.includes(`chat_wallpaper`)) {
        variablesOrder.unshift(`chat_wallpaper`);
      }
    }

    variablesOrder = [...new Set(variablesOrder)];

    const removedVariables = getRemovedVariables(themeVariables);

    const variables = variablesOrder.map(variableName => {
      if (variableName === `chat_wallpaper`) {
        if (this.props.wallpaper) {
          return (
            <Variable
              variableName="chat_wallpaper"
              key="chat_wallpaper"
              value={this.props.wallpaper}
              onClick={this.props.onClick}
            />
          );
        }

        if (
          themeVariables.includes(`chat_wallpaper`) &&
          themeVariables.includes(`chat_wallpaper_gradient_to`)
        ) {
          return (
            <Variable
              variableName="chat_wallpaper"
              key="chat_wallpaper"
              value={{
                from: this.props.theme.chat_wallpaper,
                to: this.props.theme.chat_wallpaper_gradient_to,
              }}
              onClick={this.props.onClick}
            />
          );
        }
      }

      if (themeVariables.includes(variableName)) {
        return (
          <Variable
            variableName={variableName}
            key={variableName}
            value={this.props.theme[variableName]}
            onClick={this.props.onClick}
            removalVersion={removedVariables[variableName]}
          />
        );
      }

      return (
        <Variable
          variableName={variableName}
          key={variableName}
          value={defaultValues[variableName]}
          onClick={this.props.onNewVariable}
          isUnadded={true}
        />
      );
    });

    return (
      <>
        <Field
          type="search"
          id="workspace_search"
          value={this.state.searchQuery}
          onChange={this.handleSearchChange}
          inputRef={this.searchInput}
        >
          {localization.workspace.search}
        </Field>
        {variables.length > 0 && <div className="variables">{variables}</div>}
        {variables.length === 0 && this.state.searchQuery.trim() === `` && (
          <Hint className="variables_placeholder">
            {localization.workspace.noVariablesPlaceholder}
          </Hint>
        )}
        {variables.length === 0 && this.state.searchQuery.trim() !== `` && (
          <Hint className="variables_placeholder">
            {localization.workspace.noResultsPlaceholder}
          </Hint>
        )}
      </>
    );
  }
}

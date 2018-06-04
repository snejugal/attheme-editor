import "./styles.scss";

import * as database from "../database/api";
import { allVariablesAmount, defaultValues } from "../attheme-variables";
import Attheme from "attheme-js";
import Button from "../button/component";
import Buttons from "../buttons/component";
import Field from "../field/component";
import Hint from "../hint/component";
import PropTypes from "prop-types";
import React from "react";
import VariableEditor from "../variable-editor/component";
import Variables from "../variables/component";
import download from "../download";
import localization from "../localization";
import prepareTheme from "../prepare-theme";
import uploadTheme from "../upload-theme";

const isMac = navigator.platform.toLowerCase().startsWith(`mac`);

class Workplace extends React.Component {
  static propTypes = {
    themeId: PropTypes.number.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onClosePrompt: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);

    this.state = {
      theme: null,
      editingVariable: null,
      searchQuery: ``,
      color: null,
    };
  }

  searchInput = React.createRef()

  isCtrlPressed = false

  handleKeyDown = (event) => {
    if ((isMac && event.metaKey) || (!isMac && event.ctrlKey)) {
      this.isCtrlPressed = true;
    }

    if (this.isCtrlPressed && event.code === `KeyF`) {
      event.preventDefault();
      this.searchInput.current.focus();
    }
  }

  handleKeyUp = (event) => {
    if ((isMac && event.metaKey) || (!isMac && event.ctrlKey)) {
      this.isCtrlPressed = false;
    }
  }

  componentDidMount = async () => {
    this.setState({
      theme: await database.getTheme(this.props.themeId),
    });

    document.body.addEventListener(`keydown`, this.handleKeyDown);
    document.body.addEventListener(`keyup`, this.handleKeyUp);
  }

  componentWillUnmount = () => {
    document.body.removeEventListener(`keydown`, this.handleKeyDown);
    document.body.removeEventListener(`keyup`, this.handleKeyUp);
  }

  componentDidUpdate = async (prevProps) => {
    if (prevProps.themeId !== this.props.themeId) {
      this.setState({
        theme: await database.getTheme(this.props.themeId),
      });
    }
  }

  handleNameFieldChange = (event) => {
    const name = event.target.value;
    const theme = {
      ...this.state.theme,
      name,
    };

    this.setState({
      theme,
    });

    this.props.onNameChange(name);
  }

  handleNameFieldBlur = (event) => {
    let name = event.target.value.trim();

    if (!name) {
      name = localization.theme_defaultName();
    }

    const theme = {
      ...this.state.theme,
      name,
    };

    this.setState({
      theme,
    });
    this.props.onNameChange(name);

    database.updateTheme(this.props.themeId, theme);
  }

  handleNameFieldEnter = ({ target }) => target.blur();

  downloadThemeFile = () => {
    const { theme } = prepareTheme(this.state.theme);
    const content = Attheme.asText(theme);
    const name = `${this.state.theme.name}.attheme`;

    download({
      content,
      name,
    });
  }

  downloadThemeViaTelegram = async () => {
    const themeId = await uploadTheme(this.state.theme);
    const tgLink = `tg://resolve?domain=atthemeeditorbot&start=${themeId}`;

    window.location.href = tgLink;
  }

  createPreview = async () => {
    const themeId = await uploadTheme(this.state.theme);
    const tgLink = `tg://resolve?domain=themepreviewbot&start=${themeId}`;

    window.location.href = tgLink;
  }

  testTheme = async () => {
    const themeId = await uploadTheme(this.state.theme);
    const tgLink = `tg://resolve?domain=testatthemebot&start=${themeId}`;

    window.location.href = tgLink;
  }

  downloadWorkspace = () => download({
    content: JSON.stringify(this.state.theme),
    name: `${this.state.theme.name}.attheme-editor`,
  })

  handleVariableEditStart = (variable) => {
    this.setState({
      editingVariable: variable,
      color: this.state.theme.variables[variable],
    });
  }

  handleVariableEditCancel = () => this.setState({
    editingVariable: null,
    color: null,
  })

  handleVariableEditSave = (value) => {
    const variable = this.state.editingVariable;

    this.setState({
      editingVariable: null,
    });

    let theme;

    if (typeof value === `object`) {
      const variables = {
        ...this.state.theme.variables,
        [variable]: value,
      };

      theme = {
        ...this.state.theme,
        variables,
      };
    } else {
      const variables = {
        ...this.state.theme.variables,
      };

      delete variables.chat_wallpaper;

      theme = {
        ...this.state.theme,
        variables,
        wallpaper: value,
      };
    }

    this.setState({
      theme,
    });

    database.updateTheme(this.props.themeId, theme);
  }

  handleSearchChange = (event) => this.setState({
    searchQuery: event.target.value,
  });

  handleNewVariable = (variable) => this.setState({
    editingVariable: variable,
    color: defaultValues[variable],
  })

  handleVariableDelete = () => {
    const variables = {
      ...this.state.theme.variables,
    };

    delete variables[this.state.editingVariable];

    const theme = {
      ...this.state.theme,
      variables,
    };

    if (this.state.editingVariable === `chat_wallpaper`) {
      delete theme.wallpaper;
    }

    this.setState({
      editingVariable: null,
      theme,
    });

    database.updateTheme(this.props.themeId, theme);
  }

  render () {
    let variablesAmount;

    if (this.state.theme) {
      variablesAmount = Object.keys(this.state.theme.variables).length;

      if (
        this.state.theme.wallpaper
        && !(this.state.theme.variables.chat_wallpaper)
      ) {
        variablesAmount++;
      }
    }

    return this.state.theme === null
      ? null
      : (
        <React.Fragment>
          {
            this.state.editingVariable
              ? (
                <VariableEditor
                  variable={this.state.editingVariable}
                  color={this.state.color}
                  onCancel={this.handleVariableEditCancel}
                  onSave={this.handleVariableEditSave}
                  onDelete={this.handleVariableDelete}
                  wallpaper={this.state.theme.wallpaper}
                />
              )
              : null
          }
          <Button
            onClick={this.downloadThemeViaTelegram}
            isFloating={true}
            className="workspace_downloadButton"
          />

          <Field
            className="workspace_themeName"
            id="workspace_themeName"
            onChange={this.handleNameFieldChange}
            onBlur={this.handleNameFieldBlur}
            onEnter={this.handleNameFieldEnter}
            value={this.state.theme.name}
            autoCapitalize="words"
          >
            {localization.workspace_themeNameLabel()}
          </Field>

          <Buttons>
            <Button onClick={this.props.onClosePrompt} isDangerous={true}>
              {localization.workspace_closeTheme()}
            </Button>
            <Button onClick={this.downloadThemeFile}>
              {localization.workspace_downloadThemeFile()}
            </Button>
            <Button onClick={this.downloadWorkspace}>
              {localization.workspace_downloadWorkspace()}
            </Button>
            <Button onClick={this.createPreview}>
              {localization.workspace_createPreview()}
            </Button>
            <Button onClick={this.testTheme}>
              {localization.workspace_testTheme()}
            </Button>
          </Buttons>

          <Field
            type="search"
            id="workspace_search"
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
            inputRef={this.searchInput}
          >
            {localization.workspace_search()}
          </Field>

          <Variables
            themeId={this.props.themeId}
            theme={this.state.theme.variables}
            wallpaper={this.state.theme.wallpaper}
            onClick={this.handleVariableEditStart}
            onNewVariable={this.handleNewVariable}
            displayAll={this.state.searchQuery !== ``}
            searchQuery={this.state.searchQuery}
          />

          <Hint>{
            localization.workspace_variablesAmount({
              total: allVariablesAmount,
              theme: variablesAmount,
            })
          }</Hint>
        </React.Fragment>
      );
  }
}

export default Workplace;
import "./styles.scss";

import * as database from "../database/api";
import { allVariablesAmount, defaultValues } from "../attheme-variables";
import Attheme from "attheme-js";
import Button from "../button/component";
import Buttons from "../buttons/component";
import Color from "../color";
import Field from "../field/component";
import Hint from "../hint/component";
import PropTypes from "prop-types";
import React from "react";
import ScriptRunner from "../script-runner/component";
import VariableEditor from "../variable-editor/component";
import Variables from "../variables/component";
import download from "../download";
import localization from "../localization";
import prepareTheme from "../prepare-theme";
import uploadTheme from "../upload-theme";

class Workplace extends React.Component {
  static propTypes = {
    themeId: PropTypes.number.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onClosePrompt: PropTypes.func.isRequired,
    isSearchHotkeyEnabled: PropTypes.bool,
  }

  state = {
    theme: null,
    editingVariable: null,
    color: null,
    showScriptRunner: false,
    isSearchHotkeyEnabled: true,
  };

  componentDidMount = async () => this.setState({
    theme: await database.getTheme(this.props.themeId),
  });

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

      if (variable === `chat_wallpaper`) {
        delete theme.wallpaper;
      }
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

  handleRunScriptButtonClick = () => this.setState({
    showScriptRunner: true,
  });

  handleScriptRunnerClose = () => this.setState({
    showScriptRunner: false,
  });

  handleThemeChange = (theme) => {
    this.setState({
      theme,
    });

    database.updateTheme(this.props.themeId, theme);
  }

  render () {
    if (!this.state.theme) {
      return null;
    }

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

    let dialog = null;

    const themeColors = [
      ...new Set(
        Object.values(this.state.theme.variables)
          .map((color) => Color.createHex({
            ...color,
            alpha: 255,
          })),
      ),
    ];

    if (this.state.editingVariable) {
      dialog = <VariableEditor
        variable={this.state.editingVariable}
        color={this.state.color}
        onCancel={this.handleVariableEditCancel}
        onSave={this.handleVariableEditSave}
        onDelete={this.handleVariableDelete}
        wallpaper={this.state.theme.wallpaper}
        themeColors={themeColors}
      />;
    } else if (this.state.showScriptRunner) {
      dialog = <ScriptRunner
        onClose={this.handleScriptRunnerClose}
        theme={this.state.theme}
        onThemeChange={this.handleThemeChange}
      />;
    }

    const isSearchHotkeyEnabled = !dialog && this.props.isSearchHotkeyEnabled;

    return (
      <React.Fragment>
        {dialog}

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
          <Button onClick={this.handleRunScriptButtonClick}>
            {localization.workspace_runScript()}
          </Button>
          <Button onClick={this.createPreview}>
            {localization.workspace_createPreview()}
          </Button>
          <Button onClick={this.testTheme}>
            {localization.workspace_testTheme()}
          </Button>
        </Buttons>

        <Variables
          themeId={this.props.themeId}
          theme={this.state.theme.variables}
          wallpaper={this.state.theme.wallpaper}
          onClick={this.handleVariableEditStart}
          onNewVariable={this.handleNewVariable}
          isSearchHotkeyEnabled={isSearchHotkeyEnabled}
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
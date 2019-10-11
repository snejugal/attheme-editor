import "./styles.scss";

import * as database from "../database";
import VARIABLES from "attheme-js/lib/variables";
import { defaultValues } from "../atthemeVariables";
import Button from "../Button";
import Buttons from "../Buttons";
import { ReactComponent as DownloadIcon } from "./downloadIcon.svg";
import Field from "../Field";
import Hint from "../Hint";
import PaletteEditor from "../PaletteEditor";
import PropTypes from "prop-types";
import React from "react";
import ScriptRunner from "../ScriptRunner";
import Snackbar from "../Snackbar";
import Spinner from "../Spinner";
import VariableEditor, {
  State as VariableEditorState,
} from "../VariableEditor";
import Variables from "../Variables";
import download from "../download";
import localization from "../localization";
import prepareTheme from "../prepareTheme";
import uploadTheme from "../uploadTheme";
import toBlob from "attheme-js/lib/tools/browser/toBlob";
import { Color } from "attheme-js/lib/types";
import prepareFile from "../prepareFile";

interface Props {
  themeId: number;
  onNameChange(newName: string): void;
  onClosePrompt(): void;
  isSearchHotkeyEnabled?: boolean;
}

interface State {
  theme: Theme | null;
  editingVariable: string | null;
  color: Color | null;
  showScriptRunner: boolean;
  isSearchHotkeyEnabled: boolean;
  isEditingPalette: boolean;
  editorState: VariableEditorState | null;
  loaders: {
    atthemeEditorBot: boolean;
    testAtthemeBot: boolean;
    themePreviewBot: boolean;
  };
  hasUploadError: boolean;
}

export default class Workspace extends React.Component<Props, State> {
  static propTypes = {
    themeId: PropTypes.number.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onClosePrompt: PropTypes.func.isRequired,
    isSearchHotkeyEnabled: PropTypes.bool,
  };

  state: State = {
    theme: null,
    editingVariable: null,
    color: null,
    showScriptRunner: false,
    isSearchHotkeyEnabled: true,
    isEditingPalette: false,
    editorState: null,
    loaders: {
      atthemeEditorBot: false,
      themePreviewBot: false,
      testAtthemeBot: false,
    },
    hasUploadError: false,
  };

  async componentDidMount() {
    this.setState({
      theme: await database.getTheme(this.props.themeId),
    });
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.themeId !== this.props.themeId) {
      this.setState({
        theme: await database.getTheme(this.props.themeId),
      });
    }
  }

  handleNameFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    const theme = {
      ...this.state.theme!,
      name,
    };

    this.setState({
      theme,
    });

    this.props.onNameChange(name);
  };

  handleNameFieldBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    let name = event.target.value.trim();

    if (!name) {
      name = localization.theme.defaultName;
    }

    const theme = {
      ...this.state.theme!,
      name,
    };

    this.setState({
      theme,
    });
    this.props.onNameChange(name);

    database.updateTheme(this.props.themeId, theme);
  };

  handleNameFieldEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.currentTarget.blur();
  };

  downloadThemeFile = () => {
    const { theme } = prepareTheme(this.state.theme!);
    const name = `${this.state.theme!.name}.attheme`;
    const blob = toBlob(theme, name);

    download(blob, name);
  };

  openThemeInBot = async (bot: keyof State["loaders"]) => {
    this.setState({
      loaders: {
        ...this.state.loaders,
        [bot]: true,
      },
    });

    try {
      const themeId = await uploadTheme(this.state.theme!);
      const tgLink = `tg://resolve?domain=${bot}&start=${themeId}`;

      window.location.href = tgLink;
    } catch {
      this.setState({
        hasUploadError: true,
      });
    }

    this.setState({
      loaders: {
        ...this.state.loaders,
        [bot]: false,
      },
    });
  };

  downloadThemeViaTelegram = () => this.openThemeInBot(`atthemeEditorBot`);

  createPreview = () => this.openThemeInBot(`themePreviewBot`);

  testTheme = () => this.openThemeInBot(`testAtthemeBot`);

  downloadWorkspace = () => {
    const name = `${this.state.theme!.name}.attheme-editor`;
    const serialized = JSON.stringify(this.state.theme);

    const blob = prepareFile(name, serialized);

    download(blob, name);
  };

  handleVariableEditStart = (variable: string) => {
    this.setState({
      editingVariable: variable,
      color: this.state.theme!.variables[variable],
    });
  };

  handleVariableEditClose = () =>
    this.setState({
      editingVariable: null,
      editorState: null,
      color: null,
    });

  handleVariableEditSave = (value: Color | string) => {
    const variable = this.state.editingVariable!;

    let theme;

    if (typeof value === `object`) {
      const variables = {
        ...this.state.theme!.variables,
        [variable]: value,
      };

      theme = {
        ...this.state.theme!,
        variables,
      };

      if (variable === `chat_wallpaper`) {
        delete theme.wallpaper;
      }
    } else {
      const variables = {
        ...this.state.theme!.variables,
      };

      delete variables.chat_wallpaper;

      theme = {
        ...this.state.theme!,
        variables,
        wallpaper: value,
      };
    }

    this.setState({
      editorState: null,
      theme,
    });

    database.updateTheme(this.props.themeId, theme);
  };

  handleNewVariable = (variable: string) =>
    this.setState({
      editingVariable: variable,
      color: defaultValues[variable],
    });

  handleVariableDelete = () => {
    const variables = {
      ...this.state.theme!.variables,
    };

    delete variables[this.state.editingVariable!];

    const theme = {
      ...this.state.theme!,
      variables,
    };

    if (this.state.editingVariable === `chat_wallpaper`) {
      delete theme.wallpaper;
    }

    this.setState({
      editorState: null,
      theme,
    });

    database.updateTheme(this.props.themeId, theme);
  };

  handleRunScriptButtonClick = () =>
    this.setState({
      showScriptRunner: true,
    });

  handleScriptRunnerClose = () =>
    this.setState({
      showScriptRunner: false,
    });

  handleThemeChange = (theme: Theme) => {
    this.setState({
      theme,
    });

    database.updateTheme(this.props.themeId, theme);
  };

  handleCustomPaletteColorAdd = (color: PaletteColor) => {
    const palette = [...this.state.theme!.palette, color];

    const theme = {
      ...this.state.theme!,
      palette,
    };

    this.setState({
      theme,
    });

    database.updateTheme(this.props.themeId, theme);
  };

  handleEditPaletteButtonClick = () =>
    this.setState({
      isEditingPalette: true,
    });

  handleEditPaletteClose = () =>
    this.setState({
      isEditingPalette: false,
    });

  handlePaletteChange = (palette: Palette) => {
    const theme = {
      ...this.state.theme!,
      palette,
    };

    this.setState({
      theme,
    });

    database.updateTheme(this.props.themeId, theme);
  };

  handleCustomPaletteEditStart = ({
    backupState,
  }: {
    backupState: VariableEditorState;
  }) =>
    this.setState({
      isEditingPalette: true,
      editorState: backupState,
    });

  handleSnackbarDismiss = () =>
    this.setState({
      hasUploadError: false,
    });

  render() {
    if (!this.state.theme) {
      return null;
    }

    let variablesAmount: number;

    if (this.state.theme) {
      variablesAmount = Object.keys(this.state.theme.variables).length;

      if (
        this.state.theme.wallpaper &&
        !this.state.theme.variables.chat_wallpaper
      ) {
        variablesAmount++;
      }
    }

    let dialog = null;

    if (this.state.isEditingPalette) {
      dialog = (
        <PaletteEditor
          palette={this.state.theme.palette}
          onChange={this.handlePaletteChange}
          onClose={this.handleEditPaletteClose}
          isFromVariableEditor={Boolean(this.state.editingVariable)}
        />
      );
    } else if (this.state.editingVariable) {
      dialog = (
        <VariableEditor
          variable={this.state.editingVariable}
          color={this.state.color!}
          onClose={this.handleVariableEditClose}
          onSave={this.handleVariableEditSave}
          onDelete={this.handleVariableDelete}
          theme={this.state.theme}
          onCustomPaletteColorAdd={this.handleCustomPaletteColorAdd}
          onCustomPaletteEditStart={this.handleCustomPaletteEditStart}
          stateBackup={this.state.editorState}
        />
      );
    } else if (this.state.showScriptRunner) {
      dialog = (
        <ScriptRunner
          onClose={this.handleScriptRunnerClose}
          theme={this.state.theme}
          onThemeChange={this.handleThemeChange}
        />
      );
    }

    const isSearchHotkeyEnabled = !dialog && this.props.isSearchHotkeyEnabled;

    return (
      <>
        {dialog}
        {this.state.hasUploadError && (
          <Snackbar
            timeout={5000}
            onDismiss={this.handleSnackbarDismiss}
            isError={true}
          >
            {localization.workspace.uploadError}
          </Snackbar>
        )}
        <Button
          onClick={this.downloadThemeViaTelegram}
          isFloating={true}
          className="workspace_downloadButton"
          isDisabled={this.state.loaders.atthemeEditorBot}
        >
          {this.state.loaders.atthemeEditorBot ? <Spinner /> : <DownloadIcon />}
        </Button>

        <Field
          className="workspace_themeName"
          id="workspace_themeName"
          onChange={this.handleNameFieldChange}
          onBlur={this.handleNameFieldBlur}
          onEnter={this.handleNameFieldEnter}
          value={this.state.theme.name}
          autoCapitalize="words"
        >
          {localization.workspace.themeNameLabel}
        </Field>

        <Buttons>
          <Button onClick={this.props.onClosePrompt} isDangerous={true}>
            {localization.workspace.closeTheme}
          </Button>
          <Button onClick={this.downloadThemeFile}>
            {localization.workspace.downloadThemeFile}
          </Button>
          <Button onClick={this.downloadWorkspace}>
            {localization.workspace.downloadWorkspace}
          </Button>
          <Button onClick={this.handleRunScriptButtonClick}>
            {localization.workspace.runScript}
          </Button>
          <Button
            onClick={this.createPreview}
            isDisabled={this.state.loaders.themePreviewBot}
          >
            {localization.workspace.createPreview}
            {this.state.loaders.themePreviewBot && <Spinner />}
          </Button>
          <Button
            onClick={this.testTheme}
            isDisabled={this.state.loaders.testAtthemeBot}
          >
            {localization.workspace.testTheme}
            {this.state.loaders.testAtthemeBot && <Spinner />}
          </Button>
          <Button onClick={this.handleEditPaletteButtonClick}>
            {localization.workspace.editPalette}
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

        <Hint>
          {localization.workspace.variablesAmount({
            total: VARIABLES.length,
            theme: variablesAmount!,
          })}
        </Hint>
      </>
    );
  }
}

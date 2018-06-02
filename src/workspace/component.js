import "./styles.scss";

import * as database from "../database/api";
import Attheme from "attheme-js";
import Button from "../button/component";
import Buttons from "../buttons/component";
import Field from "../field/component";
import Hint from "../hint/component";
import PropTypes from "prop-types";
import React from "react";
import Variables from "../variables/component";
import defaultValues from "attheme-default-values";
import download from "../download";
import localization from "../localization";
import prepareTheme from "../prepare-theme";
import uploadTheme from "../upload-theme";

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
    };
  }

  componentDidMount = async () => {
    this.setState({
      theme: await database.getTheme(this.props.themeId),
    });
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

  render () {
    let variablesAmount;

    if (this.state.theme) {
      variablesAmount = Object.keys(this.state.theme.theme).length;

      if (this.state.theme.wallpaper && !(this.state.theme.chat_wallpaper)) {
        variablesAmount++;
      }
    }

    return this.state.theme === null
      ? null
      : (
        <React.Fragment>
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

          <Variables
            themeId={this.props.themeId}
            theme={this.state.theme.theme}
            wallpaper={this.state.theme.wallpaper}
          />

          <Hint>{
            localization.workspace_variablesAmount({
              total: Object.keys(defaultValues).length,
              theme: variablesAmount,
            })
          }</Hint>
        </React.Fragment>
      );
  }
}

export default Workplace;
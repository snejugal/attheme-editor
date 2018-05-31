import "./styles.scss";

import * as database from "../database/api";
import Button from "../button/component";
import Buttons from "../buttons/component";
import Field from "../field/component";
import PropTypes from "prop-types";
import React from "react";
import localization from "../localization";

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

  render () {
    return this.state.theme === null
      ? null
      : (
        <React.Fragment>
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
          </Buttons>
        </React.Fragment>
      );
  }
}

export default Workplace;
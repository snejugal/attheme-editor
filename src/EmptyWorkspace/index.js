import "./styles.scss";

import Button from "../Button";
import Buttons from "../Buttons";
import Heading from "../Heading";
import Hint from "../Hint";
import PropTypes from "prop-types";
import React from "react";
import localization from "../localization";
import parseTheme from "../parseTheme";
import readFile from "../readFile";

export default class EmptyWorkspace extends React.Component {
  static propTypes = {
    onTheme: PropTypes.func.isRequired,
  }

  filesInput = React.createRef()

  handleCreateButtonClick = () => {
    this.props.onTheme({
      name: localization.theme_defaultName(),
      variables: {},
      wallpaper: ``,
      palette: [],
    });
  }

  handleChange = () => {
    const files = [...this.filesInput.current.files];

    for (const file of files) {
      if (
        !file.name.endsWith(`.attheme`)
        && !file.name.endsWith(`.attheme-editor`)
      ) {
        continue;
      }
      (async () => {
        const content = await readFile(file);
        const theme = parseTheme({
          file: content,
          filename: file.name,
        });

        this.props.onTheme(theme);
      })();
    }
  }

  handleOpenButtonClick = () => this.filesInput.current.click()

  render () {
    return <>
      <Heading level={2}>{localization.emptyWorkspace_title()}</Heading>
      <Buttons>
        <Button onClick={this.handleCreateButtonClick}>
          {localization.emptyWorkspace_createTheme()}
        </Button>
        <Button onClick={this.handleOpenButtonClick}>
          {localization.emptyWorkspace_openTheme()}
        </Button>
      </Buttons>
      <input
        hidden={true}
        type="file"
        ref={this.filesInput}
        onChange={this.handleChange}
        accept=".attheme,.attheme-editor"
        multiple={true}
      />
      <Hint className="emptyWorkspace_uploadWaysHint">
        {localization.emptyWorkspace_uploadWaysHint()}
      </Hint>
      <Hint className="emptyWorkspace_credits">
        {localization.emptyWorkspace_credits()}
      </Hint>
    </>;
  }
}

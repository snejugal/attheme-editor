import Button from "../button/component";
import Buttons from "../buttons/component";
import Heading from "../heading/component";
import PropTypes from "prop-types";
import React from "react";
import localization from "../localization";
import parseTheme from "../parse-theme";
import readFile from "../read-file";

class EmptyWorkspace extends React.Component {
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
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default EmptyWorkspace;
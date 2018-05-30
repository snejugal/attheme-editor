import Button from "../button/component";
import Buttons from "../buttons/component";
import Container from "../container/component";
import Heading from "../heading/component";
import PropTypes from "prop-types";
import React from "react";
import localization from "../localization";
import parseTheme from "../parse-theme";

class EmptyWorkspace extends React.Component {
  static propTypes = {
    handleTheme: PropTypes.func.isRequired,
  }

  filesInput = React.createRef()

  handleCreateButtonClick = () => {
    this.props.handleTheme({
      name: localization.theme_defaultName(),
      theme: {},
    });
  }

  handleChange = async () => {
    const theme = await parseTheme(this.filesInput.current.files[0]);

    this.props.handleTheme(theme);
  }

  handleOpenButtonClick = () => this.filesInput.current.click()

  render () {
    return (
      <Container>
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
        />
      </Container>
    );
  }
}

export default EmptyWorkspace;
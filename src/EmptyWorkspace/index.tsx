import "./styles.scss";

import Button from "../Button";
import Buttons from "../Buttons";
import Heading from "../Heading";
import Hint from "../Hint";
import React from "react";
import localization from "../localization";
import parseTheme from "../parseTheme";
import fromFile from "attheme-js/lib/tools/browser/fromFile";
import parseWorkspace from "../parseWorkspace";
import readFile from "../readFile";

interface Props {
  onTheme(theme: Theme): void;
}

export default class EmptyWorkspace extends React.Component<Props> {
  filesInput = React.createRef<HTMLInputElement>();

  handleCreateButtonClick = () => {
    this.props.onTheme({
      name: localization.theme_defaultName(),
      variables: {},
      wallpaper: ``,
      palette: [],
    });
  };

  handleChange = () => {
    [...this.filesInput.current!.files!].forEach(async (file) => {
      let theme;

      if (file.name.endsWith(`.attheme`)) {
        theme = parseTheme(await fromFile(file), file.name);
      } else if (file.name.endsWith(`.attheme-editor`)) {
        theme = parseWorkspace(await readFile(file));
      } else {
        return;
      }

      this.props.onTheme(theme);
    });
  };

  handleOpenButtonClick = () => this.filesInput.current!.click();

  render() {
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

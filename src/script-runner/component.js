import "codemirror/mode/javascript/javascript.js";

import Button from "../button/component";
import CodeMirror from "../codemirror/component";
import Dialog from "../dialog/component";
import Hint from "../hint/component";
import PropTypes from "prop-types";
import React from "react";
import localization from "../localizations/en";

class ScriptRunner extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  }
  editor = React.createRef()

  handleRun = () => {
    const code = this.editor.current.editor.getValue();
  }

  render () {
    return (
      <Dialog
        onDismiss={this.props.onClose}
        title={localization.scriptRunner_title()}
        buttons={
          <React.Fragment>
            <Button onClick={this.handleRun}>
              {localization.scriptRunner_run()}
            </Button>
            <Button onClick={this.props.onClose}>
              {localization.scriptRunner_close()}
            </Button>
          </React.Fragment>
        }
      >
        <Hint>{localization.scriptRunner_description()}</Hint>
        <CodeMirror
          value=""
          lineNumbers={true}
          mode="javascript"
          ref={this.editor}
        />
      </Dialog>
    );
  }
}

export default ScriptRunner;
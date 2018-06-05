import "codemirror/mode/javascript/javascript.js";

import Button from "../button/component";
import CodeMirror from "../codemirror/component";
import Dialog from "../dialog/component";
import Hint from "../hint/component";
import Interpreter from "js-interpreter";
import PropTypes from "prop-types";
import React from "react";
import localization from "../localizations/en";


class ScriptRunner extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    onThemeChange: PropTypes.func.isRequired,
  }

  editor = React.createRef()

  handleRun = () => {
    let activeTheme;

    const prepare = (interpreter, scope) => {
      activeTheme = interpreter.nativeToPseudo(this.props.theme);

      interpreter.setProperty(scope, `activeTheme`, activeTheme);
    };

    const code = this.editor.current.editor.getValue();

    const script = new Interpreter(code, prepare);

    script.run();

    this.props.onThemeChange(script.pseudoToNative(activeTheme));
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
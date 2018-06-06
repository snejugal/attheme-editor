import "codemirror/mode/javascript/javascript.js";
import "./styles.scss";

import Button from "../button/component";
import CodeMirror from "../codemirror/component";
import Dialog from "../dialog/component";
import Hint from "../hint/component";
import Interpreter from "js-interpreter";
import PropTypes from "prop-types";
import React from "react";
import localization from "../localizations/en";
import Heading from "../heading/component";

const STEPS_PER_ONCE = 50000;

class ScriptRunner extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    onThemeChange: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);

    this.state = {
      parseError: null,
      runtimeError: null,
      isEvaluated: false,
      isEvaluating: false,
    };
  }

  editor = React.createRef()

  handleRun = () => {
    this.setState({
      isEvaluating: true,
      isEvaluated: false,
    });

    const code = this.editor.current.editor.getValue();

    let activeTheme;

    const prepare = (interpreter, scope) => {
      activeTheme = interpreter.nativeToPseudo(this.props.theme);

      interpreter.setProperty(scope, `activeTheme`, activeTheme);
    };

    let script;
    let hasErrors = false;

    try {
      script = new Interpreter(code, prepare);
    } catch (parseError) {
      this.setState({
        parseError,
        isEvaluating: false,
      });

      hasErrors = true;
    }

    if (!hasErrors) {
      const nextStep = () => {
        let shouldContinue;

        try {
          for (let i = 0; i < STEPS_PER_ONCE; i++) {
            shouldContinue = script.step();

            if (!shouldContinue) {
              break;
            }
          }
        } catch (runtimeError) {
          shouldContinue = false;
          hasErrors = true;

          this.setState({
            runtimeError,
            isEvaluating: false,
          });
        }

        if (!hasErrors) {
          if (shouldContinue) {
            setTimeout(nextStep);
          } else {
            this.setState({
              isEvaluating: false,
              isEvaluated: true,
            });

            this.props.onThemeChange(script.pseudoToNative(activeTheme));
          }
        }
      };

      nextStep();
    }
  }

  render () {
    let outputTitle;
    let output;

    if (this.state.isEvaluating) {
      outputTitle = localization.scriptRunner_isEvaluating();
    } else if (this.state.isEvaluated) {
      outputTitle = localization.scriptRunner_isEvaluated();
    } else if (this.state.runtimeError) {
      outputTitle = localization.scriptRunner_runtimeError();
      output = this.state.runtimeError.message;
    } else if (this.state.parseError) {
      outputTitle = localization.scriptRunner_syntaxError();
      output = this.state.parseError.message;
    }

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
          className="scriptRunner_editor"
          value=""
          lineNumbers={true}
          autofocus={true}
          mode="javascript"
          ref={this.editor}
        />
        {
          outputTitle
            ? (
              <div className="scriptRunner_output">
                <Heading level={3} className="scriptRunner_outputTitle">
                  {outputTitle}
                </Heading>
                {
                  output
                    ? <pre>{output}</pre>
                    : null
                }
              </div>
            )
            : null
        }
      </Dialog>
    );
  }
}

export default ScriptRunner;
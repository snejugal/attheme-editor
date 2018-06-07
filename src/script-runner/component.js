import "codemirror/mode/javascript/javascript.js";
import "./styles.scss";

import Button from "../button/component";
import CodeMirror from "../codemirror/component";
import Color from "../color";
import Dialog from "../dialog/component";
import Heading from "../heading/component";
import Hint from "../hint/component";
import Interpreter from "./interpreter";
import PropTypes from "prop-types";
import React from "react";
import colorClass from "./color-class";
import localization from "../localization";

const STEPS_PER_ONCE = 50000;
const BABEL_OPTIONS = {
  presets: [
    `es2015`,
    `es2016`,
    `es2017`,
  ],
};

let Babel;

window.Color = Color;

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

    (async () => {
      if (!Babel) {
        Babel = await import(`@babel/standalone`);
      }
    })();
  }

  editor = React.createRef()

  handleRun = () => {
    this.setState({
      isEvaluating: true,
      isEvaluated: false,
    });
    let hasErrors = false;

    let code = this.editor.current.editor.getValue();

    try {
      ({ code } = Babel.transform(code, BABEL_OPTIONS));
    } catch (parseError) {
      this.setState({
        parseError,
        isEvaluating: false,
      });

      hasErrors = true;
    }

    let activeTheme;

    const prepare = (interpreter, scope) => {
      // const colorClass = interpreter.nativeToPseudo({
      //   createHex: Color.createHex,
      //   parseHex: Color.parseHex,
      //   brightness: Color.brightness,
      //   overlay: Color.overlay,
      //   createCssRgb: Color.createCssRgb,
      // });

      const log = (...messageParts) => {
        // eslint-disable-next-line no-console
        console.log(
          localization.scriptRunner_logMessage(),
          ...messageParts.map((part) => interpreter.pseudoToNative(part))
        );
      };

      activeTheme = interpreter.nativeToPseudo(this.props.theme);

      interpreter.setProperty(
        scope,
        `editor`,
        scope,
        Interpreter.READONLY_DESCRIPTOR,
      );

      interpreter.setProperty(scope, `activeTheme`, activeTheme);
      interpreter.setProperty(
        scope,
        `Color`,
        interpreter.nativeToPseudo(colorClass),
      );
      interpreter.setProperty(
        scope,
        `log`,
        interpreter.createNativeFunction(log)
      );
    };

    let script;

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
          indentUnit={2}
          indentWithTabs={false}
          tabSize={2}
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
                    ? <p>{output}</p>
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
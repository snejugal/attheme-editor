import "./styles.scss";

import { allVariables, defaultValues } from "../attheme-variables";
import Button from "../button/component";
import CodeEditor from "../code-editor/component";
import Color from "../color";
import Dialog from "../dialog/component";
import Heading from "../heading/component";
import Hint from "../hint/component";
import PropTypes from "prop-types";
import React from "react";
import Spinner from "../spinner/component";
import colorClass from "./color-class";
import createTheme from "./theme";
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
let Interpreter;

window.Color = Color;

class ScriptRunner extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    onThemeChange: PropTypes.func.isRequired,
  }

  state = {
    parseError: null,
    runtimeError: null,
    isEvaluated: false,
    isEvaluating: false,
    isBabelLoaded: false,
    isBabelLoading: true,
    isInterpreterLoaded: false,
    isInterpreterLoading: true,
  };

  componentDidMount = async () => {
    if (Babel) {
      this.setState({
        isBabelLoaded: true,
        isBabelLoading: false,
      });
    } else {
      try {
        Babel = await import(`@babel/standalone`);
      } catch (e) {
        this.setState({
          isBabelLoaded: false,
          isBabelLoading: false,
        });

        return;
      }

      this.setState({
        isBabelLoaded: true,
        isBabelLoading: false,
      });
    }

    if (Interpreter) {
      this.setState({
        isInterpreterLoaded: true,
        isInterpreterLoading: false,
      });
    } else {
      try {
        ({ default: Interpreter } = await import(`es-interpreter`));
      } catch (e) {
        this.setState({
          isInterpreterLoaded: false,
          isInterpreterLoading: false,
        });

        return;
      }

      this.setState({
        isInterpreterLoaded: true,
        isInterpreterLoading: false,
      });
    }
  }

  editor = React.createRef();

  handleRun = () => {
    this.setState({
      isEvaluating: true,
      isEvaluated: false,
      runtimeError: null,
      parseError: null,
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

    const themeCopy = {
      ...this.props.theme,
      variables: {
        ...this.props.theme.variables,
      },
      palette: [
        ...this.props.theme.palette,
      ],
    };

    const activeTheme = createTheme(themeCopy);

    const prepare = (interpreter, scope) => {
      const log = (...messageParts) => {
        // eslint-disable-next-line no-console
        console.log(
          localization.scriptRunner_logMessage(),
          ...messageParts.map((part) => interpreter.pseudoToNative(part))
        );
      };

      window.script = interpreter;

      interpreter.setProperty(
        scope,
        `editor`,
        scope,
        Interpreter.READONLY_DESCRIPTOR,
      );

      interpreter.setProperty(
        scope,
        `activeTheme`,
        interpreter.nativeToPseudo(activeTheme),
      );
      interpreter.setProperty(
        scope,
        `Color`,
        interpreter.nativeToPseudo(colorClass),
      );
      interpreter.setProperty(
        scope,
        `log`,
        interpreter.createNativeFunction(log),
      );
      interpreter.setProperty(
        scope,
        `allVariablesList`,
        interpreter.nativeToPseudo(allVariables),
      );
      interpreter.setProperty(
        scope,
        `allVariablesDefaultValues`,
        interpreter.nativeToPseudo(defaultValues),
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

            this.props.onThemeChange(themeCopy);
          }
        }
      };

      nextStep();
    }
  };

  handleEditorFocus = () => {
    if (this.state.isEvaluated) {
      this.setState({
        isEvaluated: false,
      });
    }
  };

  render () {
    let outputTitle;
    let output;
    let outputClassName = `scriptRunner_output`;

    if (this.state.isEvaluated) {
      outputTitle = localization.scriptRunner_isEvaluated();
      outputClassName += ` -success`;
    } else if (this.state.runtimeError) {
      outputTitle = localization.scriptRunner_runtimeError();
      output = this.state.runtimeError.message;
      outputClassName += ` -error`;
    } else if (this.state.parseError) {
      outputTitle = localization.scriptRunner_syntaxError();
      output = this.state.parseError.message;
      outputClassName += ` -error`;
    } else if (
      !this.state.isBabelLoaded
      && !this.state.isBabelLoading
    ) {
      outputTitle = localization.scriptRunner_babelLoadingFailed();
      outputClassName += ` -error`;
    } else if (
      !this.state.isInterpreterLoaded
      && !this.state.isInterpreterLoading
    ) {
      outputTitle = localization.scriptRunner_interpreterLoadingFailed();
      outputClassName += ` -error`;
    }

    const isRunButtonDisabled = !this.state.isBabelLoaded
      || !this.state.isInterpreterLoaded
      || this.state.isEvaluating;

    return (
      <Dialog
        onDismiss={this.props.onClose}
        title={localization.scriptRunner_title()}
        buttons={
          <React.Fragment>
            <Button
              onClick={this.handleRun}
              isDisabled={isRunButtonDisabled}
            >
              {localization.scriptRunner_run()}
              {isRunButtonDisabled && <Spinner/>}
            </Button>
            <Button onClick={this.props.onClose}>
              {localization.scriptRunner_close()}
            </Button>
          </React.Fragment>
        }
      >
        <Hint>{localization.scriptRunner_description()}</Hint>
        <CodeEditor
          className="scriptRunner_editor"
          ref={this.editor}
          onFocus={this.handleEditorFocus}
        />
        {
          outputTitle
            ? (
              <div className={outputClassName}>
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
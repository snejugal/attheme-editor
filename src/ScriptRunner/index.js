import "./styles.scss";

import { allVariables, defaultValues } from "../atthemeVariables";
import CodeEditor from "../CodeEditor";
import Color from "@snejugal/color";
import Dialog from "../Dialog";
import Heading from "../Heading";
import Hint from "../Hint";
import PropTypes from "prop-types";
import React from "react";
import Spinner from "../Spinner";
import colorClass from "./colorClass";
import createTheme from "./theme";
import localization from "../localization";
import deepClone from "lodash/cloneDeep";

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

export default class ScriptRunner extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    onThemeChange: PropTypes.func.isRequired,
  };

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

  async componentDidMount() {
    if (Babel) {
      this.setState({
        isBabelLoaded: true,
        isBabelLoading: false,
      });
    } else {
      try {
        Babel = await import(`@babel/standalone`);
      } catch {
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
        Interpreter = (await import(`es-interpreter`)).default;
      } catch {
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

    const themeCopy = deepClone(this.props.theme);
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

  render() {
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

    const isRunButtonDisabled = (
      !this.state.isBabelLoaded
      || !this.state.isInterpreterLoaded
      || this.state.isEvaluating
    );

    return (
      <Dialog
        title={localization.scriptRunner_title()}
        onClose={this.props.onClose}
        buttons={[
          {
            caption: <>
              {localization.scriptRunner_run()}
              {isRunButtonDisabled && <Spinner/>}
            </>,
            onClick: this.handleRun,
            isDisabled: isRunButtonDisabled,
          },
          {
            caption: localization.scriptRunner_close(),
            shouldCloseAfterClick: true,
          },
        ]}
      >
        <Hint>{localization.scriptRunner_description()}</Hint>
        <CodeEditor
          className="scriptRunner_editor"
          ref={this.editor}
          onFocus={this.handleEditorFocus}
        />
        {outputTitle && (
          <div className={outputClassName}>
            <Heading level={3} className="scriptRunner_outputTitle">
              {outputTitle}
            </Heading>
            {output && <p>{output}</p>}
          </div>
        )}
      </Dialog>
    );
  }
}

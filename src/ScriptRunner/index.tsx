import "./styles.scss";

import { allVariables, defaultValues } from "../atthemeVariables";
import CodeEditor from "../CodeEditor";
import Dialog from "../Dialog";
import Heading from "../Heading";
import Hint from "../Hint";
import React from "react";
import Spinner from "../Spinner";
import colorClass from "./colorClass";
import createTheme from "./createTheme";
import localization from "../localization";
import deepClone from "lodash/cloneDeep";

const STEPS_PER_ONCE = 50000;
const BABEL_OPTIONS = {
  plugins: [
    `proposal-object-rest-spread`,
    `proposal-optional-catch-binding`,
  ],
  presets: [
    `es2015`,
    `es2016`,
    `es2017`,
  ],
};

let Babel: Babel;
let Interpreter: EsInterpreter;

interface Props {
  onClose(): void;
  theme: Theme;
  onThemeChange(theme: Theme): void;
}

interface State {
  parseError: Error | null;
  runtimeError: Error | null;
  isEvaluated: boolean;
  isEvaluating: boolean;
  isBabelLoaded: boolean;
  isBabelLoading: boolean;
  isInterpreterLoaded: boolean;
  isInterpreterLoading: boolean;
}

export default class ScriptRunner extends React.Component<Props, State> {
  state: State = {
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

  editor = React.createRef<CodeEditor>();

  handleRun = () => {
    this.setState({
      isEvaluating: true,
      isEvaluated: false,
      runtimeError: null,
      parseError: null,
    });

    let hasErrors = false;
    let code = this.editor.current!.editor.getValue();

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

    const prepare = (
      interpreter: EsInterpreterInstance,
      scope: EsInterpreterScope,
      ) => {
      const log = (...messageParts: unknown[]) => {
        // eslint-disable-next-line no-console
        console.log(
          localization.scriptRunner.logMessage,
          ...messageParts.map((part) => interpreter.pseudoToNative(part)),
        );
      };

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

    let script: EsInterpreterInstance;

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
          for (let step = 0; step < STEPS_PER_ONCE; step++) {
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
      outputTitle = localization.scriptRunner.isEvaluated;
      outputClassName += ` -success`;
    } else if (this.state.runtimeError) {
      outputTitle = localization.scriptRunner.runtimeError;
      output = this.state.runtimeError.message;
      outputClassName += ` -error`;
    } else if (this.state.parseError) {
      outputTitle = localization.scriptRunner.syntaxError;
      output = this.state.parseError.message;
      outputClassName += ` -error`;
    } else if (
      !this.state.isBabelLoaded
      && !this.state.isBabelLoading
    ) {
      outputTitle = localization.scriptRunner.babelLoadingFailed;
      outputClassName += ` -error`;
    } else if (
      !this.state.isInterpreterLoaded
      && !this.state.isInterpreterLoading
    ) {
      outputTitle = localization.scriptRunner.interpreterLoadingFailed;
      outputClassName += ` -error`;
    }

    const isRunButtonDisabled = (
      !this.state.isBabelLoaded
      || !this.state.isInterpreterLoaded
      || this.state.isEvaluating
    );

    return (
      <Dialog
        title={localization.scriptRunner.title}
        onClose={this.props.onClose}
        buttons={[
          {
            caption: <>
              {localization.scriptRunner.run}
              {isRunButtonDisabled && <Spinner/>}
            </>,
            onClick: this.handleRun,
            isDisabled: isRunButtonDisabled,
          },
          {
            caption: localization.scriptRunner.close,
            shouldCloseAfterClick: true,
          },
        ]}
      >
        <Hint>{localization.scriptRunner.description}</Hint>
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

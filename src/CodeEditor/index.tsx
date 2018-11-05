import React from "react";

let CodeMirror: CodeMirrorClass;
let areStylesImported = false;
let isJavaScriptModeLoaded = false;

interface Props {
  className?: string;
  onFocus(): void;
}

export default class CodeEditor extends React.Component<Props> {
  editor = {
    getValue() {
      return ``;
    },
  };

  container = React.createRef<HTMLDivElement>();

  async componentDidMount() {
    try {
      if (!CodeMirror) {
        CodeMirror = (await import(`codemirror`)).default;
      }

      if (!areStylesImported) {
        await import(`codemirror/lib/codemirror.css`);
        areStylesImported = true;
      }

      if (!isJavaScriptModeLoaded) {
        await import(`codemirror/mode/javascript/javascript.js`);
        isJavaScriptModeLoaded = true;
      }
    } catch {
      const textarea = document.createElement(`textarea`);

      textarea.autofocus = true;

      if (this.props.onFocus) {
        textarea.addEventListener(`focus`, this.props.onFocus);
      }

      this.editor = {
        getValue () {
          return textarea.value;
        },
      };

      this.container.current!.appendChild(textarea);

      return;
    }

    // eslint-disable-next-line new-cap
    const editor = CodeMirror(this.container.current!, {
      value: ``,
      lineNumbers: true,
      autofocus: true,
      mode: `javascript`,
      indentUnit: 2,
      indentWithTabs: false,
      tabSize: 2,
    });

    if (this.props.onFocus) {
      editor.on(`focus`, this.props.onFocus);
    }

    this.editor = editor;
  }

  render() {
    return <div className={this.props.className} ref={this.container}/>;
  }
}

import PropTypes from "prop-types";
import React from "react";

let CodeMirror;
let areStylesImported = false;
let isJavaScriptModeLoaded = false;

export default class CodeMirrorEditor extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onFocus: PropTypes.func,
  };

  container = React.createRef();

  componentDidMount = async () => {
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
    } catch (e) {
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

      this.container.appendChild(textarea);

      return;
    }

    const editor = new CodeMirror(this.container.current, {
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

  render () {
    return <div className={this.props.className} ref={this.container}/>;
  }
}

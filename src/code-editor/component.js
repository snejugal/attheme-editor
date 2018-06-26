import PropTypes from "prop-types";
import React from "react";

let CodeMirror;
let areStylesImported = false;
let isJavaScriptModeLoaded = false;

class CodeMirrorEditor extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    mode: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    lineSeparator: PropTypes.string,
    theme: PropTypes.string,
    indentUnit: PropTypes.number,
    smartIndent: PropTypes.bool,
    tabSize: PropTypes.number,
    indentWithTabs: PropTypes.bool,
    electricChars: PropTypes.bool,
    specialChars: PropTypes.instanceOf(RegExp),
    specialCharPlaceholer: PropTypes.func,
    rtlMoveVisually: PropTypes.bool,
    keyMap: PropTypes.string,
    extraMap: PropTypes.object,
    configureMouse: PropTypes.func,
    lineWrapping: PropTypes.bool,
    lineNumbers: PropTypes.bool,
    firstLineNumber: PropTypes.number,
    lineNumberFormatter: PropTypes.func,
    gutters: PropTypes.arrayOf([
      PropTypes.string,
    ]),
    fixedGutter: PropTypes.bool,
    scrollbarStyle: PropTypes.string,
    coverGutterNextToScrollbar: PropTypes.bool,
    inputStyle: PropTypes.string,
    readOnly: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
    showCursorWhenSelecting: PropTypes.bool,
    lineWiseCopyCut: PropTypes.bool,
    pasteLinesPerSelection: PropTypes.bool,
    undoDepth: PropTypes.number,
    historyEventDelay: PropTypes.number,
    tabindex: PropTypes.number,
    autofocus: PropTypes.bool,
    dragDrop: PropTypes.bool,
    allowDropFileTypes: PropTypes.arrayOf([
      PropTypes.string,
    ]),
    cursorBlinkRate: PropTypes.number,
    cursorScrollMargin: PropTypes.number,
    cursorHeight: PropTypes.number,
    resetSelectionOnContextMenu: PropTypes.bool,
    workTime: PropTypes.number,
    workDelay: PropTypes.number,
    pollInterval: PropTypes.number,
    flattenSpans: PropTypes.bool,
    addMoreClass: PropTypes.bool,
    maxHighlightLength: PropTypes.number,
    viewportMargin: PropTypes.number,
    ...[
      `Change`, `Changes`, `BeforeChange`, `CursorActivity`, `KeyHandled`,
      `InputRead`, `ElectricInput`, `BeforeSelectionChange`, `CiewportChange`,
      `SwapDoc`, `GutterClick`, `GutterContextMenu`, `Focus`, `Blur`, `Scroll`,
      `Refresh`, `OptionChange`, `ScrollCursorIntoView`, `Update`, `RenderLine`,
      `Mousedown`, `Doubleclick`, `Touchstart`, `Contextmenu`, `Keydown`,
      `Keypress`, `Keyup`, `Cut`, `Copy`, `Dragstart`, `Dragenter`, `Dragover`,
      `Dragleave`, `Drop`,
    ].reduce((object, property) => {
      object[`on${property}`] = PropTypes.func;

      return object;
    }, {}),
  }

  container = React.createRef();

  componentDidMount = async () => {
    if (!CodeMirror) {
      CodeMirror = await import(`codemirror`);
    }

    if (!areStylesImported) {
      await import(`codemirror/lib/codemirror.css`);
      areStylesImported = true;
    }

    if (!isJavaScriptModeLoaded) {
      await import(`codemirror/mode/javascript/javascript.js`);
      isJavaScriptModeLoaded = true;
    }

    const options = {};
    const events = {};

    for (const option in this.props) {
      if (option === `className`) {
        continue;
      }

      if (option.startsWith(`on`)) {
        let eventName = option.slice(`on`.length);

        eventName = eventName[0].toLowerCase() + eventName.slice(1);

        events[eventName] = this.props[option];
      } else {
        options[option] = this.props[option];
      }
    }

    const editor = new CodeMirror(this.container.current, options);

    for (const event in events) {
      editor.on(event, events[event]);
    }

    this.editor = editor;
  }

  render () {
    return <div className={this.props.className} ref={this.container}/>;
  }
}

export default CodeMirrorEditor;
interface IDBObjectStore {
  oncomplete(): any;
}

interface PartialColor {
  red: number;
  green: number;
  blue: number;
}

interface Theme {
  name: string;
  variables: {
    [key: string]: Color;
  },
  wallpaper?: string;
  palette: (string | PartialColor)[];
}

// This is a workaround, because Babel (that CRA uses) doesn't support `import`
// in type declarations.
// https://github.com/babel/babel/pull/8798
class CodeMirrorClass {
  constructor(host: HTMLElement, options: {
    value: string;
    lineNumbers: boolean;
    autofocus: boolean;
    mode: string;
    indentUnit: number;
    indentWithTabs: boolean;
    tabSize: number;
  });

  on(event: string, handler: () => any);

  getValue(): string;
}

declare module "codemirror/lib/codemirror.css" { }
declare module "codemirror/mode/javascript/javascript.js" { }
declare module "codemirror" {
  export default CodeMirrorClass;
}

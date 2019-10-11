interface IDBObjectStore {
  oncomplete(): any;
}

interface PartialColor {
  red: number;
  green: number;
  blue: number;
  alpha?: number;
}

interface PaletteColor {
  name: string;
  color: PartialColor;
}

interface Gradient {
  from: Color;
  to: Color;
}

type Palette = (string | PaletteColor)[];

interface Theme {
  name: string;
  variables: {
    [key: string]: Color;
  };
  wallpaper?: string;
  palette: Palette;
}

// `typeof import(...)` is unsupported by Babel, so we declare a global type in
// a file that it doesn't parse.
// https://github.com/babel/babel/pull/8798
type CodeMirrorClass = typeof import("codemirror");
type Babel = typeof import("@babel/standalone");
type EsInterpreter = import("es-interpreter");
type EsInterpreterInstance = import("es-interpreter").default;
type EsInterpreterScope = import("es-interpreter").Scope;
type VibrantClass = typeof import("node-vibrant").default;
type Quantizer = typeof import("node-vibrant/lib/quantizer/worker").default;

declare module "codemirror/lib/codemirror.css" {}
declare module "codemirror/mode/javascript/javascript.js" {}

declare module "@babel/standalone" {
  interface BabelOptions {
    presets?: string[];
    plugins?: string[];
  }

  export function transform(
    code: string,
    options: BabelOptions,
  ): {
    code: string;
  };
}
declare module "es-interpreter" {
  export interface Scope {}
  export interface Peudo {}
  export interface Descriptor {}

  export default class Interpeter {
    static READONLY_DESCRIPTOR: Descriptor = {};

    constructor(
      code: string,
      prepare: (interpeter: Interpeter, scope: Scope) => void,
    );

    setProperty(
      scope: Scope,
      identifier: string,
      value: Peudo,
      descriptor?: Descriptor,
    );
    nativeToPseudo(value: any): Peudo;
    createNativeFunction(
      fn: <T extends unknown[]>(...args: T) => unknown,
    ): Peudo;
    pseudoToNative(value: Pseudo): unknown;
    step(): boolean;
  }
}

declare module "fuzzy-search" {
  export default class FuzzySearch {
    constructor(
      hay: string[],
      keys: strings[],
      options: {
        caseSensetive?: boolean;
        sort?: boolean;
      },
    );

    search(needle: string): string[];
  }
}

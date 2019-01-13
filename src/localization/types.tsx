import { ReactNode } from "react";

export interface VariablesAmountProp {
  total: number;
  theme: number;
}

export interface Localization {
  dragAndDrop: {
    hint: string;
  };
  error: {
    title: ReactNode;
    description: ReactNode;
    dismiss: ReactNode;
  };
  emptyWorkspace: {
    title: ReactNode;
    createTheme: ReactNode;
    openTheme: ReactNode;
    credits: ReactNode;
    uploadWaysHint: ReactNode;
  };
  theme: {
    defaultName: string;
  };
  workspace: {
    themeNameLabel: ReactNode;
    closeTheme: ReactNode;
    closeThemePrompt: ReactNode;
    downloadThemeFile: ReactNode;
    createPreview: ReactNode;
    testTheme: ReactNode;
    downloadWorkspace: ReactNode;
    runScript: ReactNode;
    editPalette: ReactNode;
    unaddedVariable: ReactNode;
    unusedVariable: ReactNode;
    obsoleteVariable: ReactNode;
    nonStandardVariable: ReactNode;
    removedVariable(version: string): ReactNode;
    search: ReactNode;
    variablesAmount(params: VariablesAmountProp): ReactNode;
    noVariablesPlaceholder: ReactNode;
    noResultsPlaceholder: ReactNode;
    uploadError: ReactNode;
    downloadError: ReactNode;
  };
  confirmDialog: {
    yes: ReactNode;
    no: ReactNode;
  };
  variableEditor: {
    cancel: ReactNode;
    save: ReactNode;
    delete: ReactNode;
    red: ReactNode;
    green: ReactNode;
    blue: ReactNode;
    hue: ReactNode;
    saturation: ReactNode;
    lightness: ReactNode;
    hex: ReactNode;
    alpha: ReactNode;
    uploadImage: ReactNode;
    imageTab: ReactNode;
    colorModelsTab: ReactNode;
    palettesTab: ReactNode;
    wallpaperColorsHint: ReactNode;
    editPalette: ReactNode;
    themeColorsPlaceholder: ReactNode;
    themeCustomPalettePlaceholder: ReactNode;
  };
  scriptRunner: {
    title: ReactNode;
    description: ReactNode;
    close: ReactNode;
    run: ReactNode;
    isEvaluated: ReactNode;
    runtimeError: ReactNode;
    syntaxError: ReactNode;
    logMessage: ReactNode;
    babelLoadingFailed: ReactNode;
    interpreterLoadingFailed: ReactNode;
  };
  palettes: {
    apple: string;
    materialDesign: string;
    css: string;
    themeColors: string;
    themeCustomPalette: string;
  };
  paletteEditor: {
    close: ReactNode;
    cancel: ReactNode;
    save: ReactNode;
    delete: ReactNode;
    back: ReactNode;
    newColor: ReactNode;
    title: ReactNode;
    defaultColorName: string;
    placeholder: ReactNode;
  };
}

// eslint-disable-next-line space-infix-ops
type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type PartialLocalization = DeepPartial<Localization>;

import React from "react";
import Link from "../Link";
import { ReactComponent as LoveEmoji } from "../EmptyWorkspace/love.svg";
import { Localization, VariablesAmountProp } from "./types";

// eslint-disable-next-line quotes
type Forms = "one" | "other";

const pluralRules = new Intl.PluralRules(`en`);
const select = (num: number): Forms => pluralRules.select(num) as Forms;

const localization: Localization = {
  dragAndDrop: {
    hint: `Drop .attheme or .attheme-editor files here`,
  },
  error: {
    title: `Whoops, some error happened.`,
    description: <>
      Please send a screenshot of the following error to {}
      <Link href="//t.me/snejugal" isWhite={true}>
        the developer on Telegram
      </Link>
      {} and describe what you did so the error happened. You may also need to send the original theme file you used.
    </>,
    dismiss: `To dismiss the error, just tap it.`,
  },
  emptyWorkspace: {
    title: `Start working on your theme`,
    createTheme: `Create a new theme`,
    openTheme: `Open existing themes`,
    credits: <>
      Created by {}
      <Link href="//t.me/snejugal">@snejugal</Link>
      {} and {}
      <Link href="//t.me/AlexStrNik">@AlexStrNik</Link>
      {} with {}
      <LoveEmoji className="emoji" />.
      {} Check out {}
      <Link href="//github.com/snejugal/attheme-editor">
        the editor&apos;s source code on GitHub
      </Link>
      {} and subscribe to {}
      <Link href="//t.me/atthemeeditor">
        our channel on Telegram
      </Link>!
    </>,
    uploadWaysHint: <>
      You can also use drag&apos;n&apos;drop to open themes or use {}
      <Link href="//t.me/atthemeeditorbot">@atthemeeditorbot</Link>
      {} to open themes via Telegram.
    </>,
  },
  theme: {
    defaultName: `Awesome Theme`,
  },
  workspace: {
    themeNameLabel: `Theme name`,
    closeTheme: `Close theme`,
    closeThemePrompt: `Are you sure you want to close the theme?`,
    downloadThemeFile: `Download .attheme directly`,
    createPreview: `Create a preview`,
    testTheme: `Test the theme`,
    downloadWorkspace: `Download the workspace`,
    runScript: `Run a script`,
    editPalette: `Edit the theme's custom palette`,
    unaddedVariable: `Unadded`,
    unusedVariable: `Unused by Telegram`,
    obsoleteVariable: `Obsolete`,
    nonStandardVariable: `Non-standard`,
    removedVariable(version) {
      return `Removed since ${version}`;
    },
    search: `Search`,
    variablesAmount({ total, theme }: VariablesAmountProp) {
      const forms = {
        one: {
          one: `${theme} of ${total} variable is added to the theme`,
          other: `${theme} of ${total} variable are added to the theme`,
        },
        other: {
          one: `${theme} of ${total} variables is added to the theme`,
          other: `${theme} of ${total} variables are added to the theme`,
        },
      };

      return forms[select(total)][select(theme)];
    },
    noVariablesPlaceholder: `You don't have any variables in the theme yet :( Go and add some via the search field above!`,
    noResultsPlaceholder: `Whops, the search didn't give any results. Maybe you have a typo in your query?`,
    uploadError: `Whops, the editor couldn't upload the theme to the bot. Сheck your internet connection and try again.`,
    downloadError: `Whops, you seem to open a theme that has expired. You should send the theme to the bot once again to be able to open it in the editor.`,
  },
  confirmDialog: {
    yes: `Yes`,
    no: `No`,
  },
  variableEditor: {
    cancel: `Cancel`,
    save: `Save`,
    delete: `Delete`,
    red: `Red`,
    green: `Green`,
    blue: `Blue`,
    hue: `Hue`,
    lightness: `Lightness, %`,
    saturation: `Saturation, %`,
    hex: `HEX`,
    alpha: `Alpha`,
    uploadImage: `Upload an image`,
    downloadImage: `Download the image`,
    imageTab: `Image`,
    colorModelsTab: `Color models`,
    palettesTab: `Palettes`,
    wallpaperColorsHint: `Here are some colors from the wallpaper. Click one to add it to your theme's palette:`,
    editPalette: `Edit the palette`,
    themeColorsPlaceholder: `Whops, no colors in the theme yet.`,
    themeCustomPalettePlaceholder: `Whops, no colors in the custom palette… yet. Click the “Edit the palette” button above!`,
  },
  scriptRunner: {
    title: `Run a script`,
    description: <>
      .attheme editor lets you easily run scripts wrriten in EcmaScript 2017 to fasten theme developing. You can read more about the API the editor provides on <Link href="//github.com/SnejUgal/attheme-editor/wiki/.attheme-editor-scripts-documentation">its GitHub repository&apos;s wiki</Link>.
    </>,
    close: `Close`,
    run: `Run`,
    isEvaluated: `The script has run successfully!`,
    runtimeError: `Whops, the following error happened in your script:`,
    syntaxError: `Whops, you have wrong syntax in your script:`,
    logMessage: `Your script logged:`,
    babelLoadingFailed: `Failed to load Babel. Check your internet connection and reload the page.`,
    interpreterLoadingFailed: `Failed to load the interpreter. Check your internet connection and reload the page.`,
  },
  palettes: {
    apple: `Apple`,
    materialDesign: `Material Design`,
    css: `CSS colors`,
    themeColors: `The theme's colors`,
    themeCustomPalette: `The theme's custom palette`,
  },
  paletteEditor: {
    close: `Close`,
    cancel: `Cancel`,
    save: `Save`,
    delete: `Delete`,
    back: `Back to the variable`,
    newColor: `Add a new color`,
    title: `The theme's custom palette`,
    defaultColorName: `Beautiful color`,
    placeholder: `Whops, the palette is empty… Yet. Click the “Add a new color” button at the bottom or, if chat_wallpaper is assigned an image, open its editor and add the colors it suggests to this palette!`,
  },
};

export default localization;

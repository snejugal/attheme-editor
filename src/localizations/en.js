import Link from "../link/component";
import { ReactComponent as LoveEmoji } from "../empty-workspace/love.svg";
import React from "react";

const pluralRules = new Intl.PluralRules(`en`);

const localization = {
  dropHint: () => `Drop .attheme or .attheme-editor files here`,

  error_title: () => `Whoops, some error happened.`,
  error_description: () => <>
    Please send a screenshot of the following error to {}
    <Link href="//t.me/snejugal" isWhite={true}>
      the developer on Telegram
    </Link>
    {} and describe what you did so the error happened. You may also need to send the original theme file you used.
  </>,
  error_dismiss: () => `To dismiss the error, just tap it.`,

  emptyWorkspace_title: () => `Start working on your theme`,
  emptyWorkspace_createTheme: () => `Create a new theme`,
  emptyWorkspace_openTheme: () => `Open existing themes`,
  emptyWorkspace_credits: () => <>
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
  emptyWorkspace_uploadWaysHint: () => <>
    You can also use drag&apos;n&apos;drop to open themes or use {}
    <Link href="//t.me/atthemeeditorbot">@atthemeeditorbot</Link>
    {} to open themes via Telegram.
  </>,

  theme_defaultName: () => `Awesome Theme`,

  workspace_themeNameLabel: () => `Theme name`,
  workspace_closeTheme: () => `Close theme`,
  workspace_closeThemePrompt: () => `Are you sure you want to close the theme?`,
  workspace_downloadThemeFile: () => `Download .attheme directly`,
  workspace_createPreview: () => `Create a preview`,
  workspace_testTheme: () => `Test the theme`,
  workspace_downloadWorkspace: () => `Download the workspace`,
  workspace_runScript: () => `Run a script`,
  workspace_editPalette: () => `Edit the theme's custom palette`,
  workspace_unaddedVariable: () => `Unadded`,
  workspace_unusedVariable: () => `Unused by Telegram`,
  workspace_obsoleteVariable: () => `Obsolete`,
  workspace_nonStandardVariable: () => `Non-standard`,
  workspace_search: () => `Search`,
  workspace_variablesAmount: ({ total, theme }) => {
    const forms = {
      "one one": `${theme} of ${total} variable is added to the theme`,
      "one other": `${theme} of ${total} variables is added to the theme`,
      "other one": `${theme} of ${total} variable are added to the theme`,
      "other other": `${theme} of ${total} variables are added to the theme`,
    };

    return forms[`${pluralRules.select(theme)} ${pluralRules.select(total)}`];
  },
  workspace_noVariablesPlaceholder: () => `You don't have any variables in the theme yet :( Go and add some via the search field above!`,
  workspace_noResultsPlaceholder: () => `Whops, the search didn't give any results. Maybe you have a typo in your query?`,
  workspace_uploadError: () => `Whops, the editor couldn't upload the theme to the bot. Сheck your internet connection and try again.`,

  confirmDialog_yes: () => `Yes`,
  confirmDialog_no: () => `No`,

  variableEditor_cancel: () => `Cancel`,
  variableEditor_save: () => `Save`,
  variableEditor_delete: () => `Delete`,
  variableEditor_red: () => `Red`,
  variableEditor_green: () => `Green`,
  variableEditor_blue: () => `Blue`,
  variableEditor_hue: () => `Hue`,
  variableEditor_lightness: () => `Lightness, %`,
  variableEditor_saturation: () => `Saturation, %`,
  variableEditor_hex: () => `HEX`,
  variableEditor_alpha: () => `Alpha`,
  variableEditor_uploadImage: () => `Upload an image`,
  variableEditor_imageTab: () => `Image`,
  variableEditor_colorModelsTab: () => `Color models`,
  variableEditor_palettesTab: () => `Palettes`,
  variableEditor_wallpaperColorsHint: () => `Here are some colors from the wallpaper. Click one to add it to your theme's palette:`,
  variableEditor_editPalette: () => `Edit the palette`,
  variableEditor_themeColorsPlaceholder: () => `Whops, no colors in the theme yet.`,
  variableEditor_themeCustomPalettePlaceholder: () => `Whops, no colors in the custom palette… yet. Click the “Edit the palette” button above!`,

  scriptRunner_title: () => `Run a script`,
  scriptRunner_description: () => <>
    .attheme editor lets you easily run scripts wrriten in EcmaScript 2017 to fasten theme developing. You can read more about the API the editor provides on <Link href="//github.com/SnejUgal/attheme-editor/wiki/.attheme-editor-scripts-documentation">its GitHub repository&apos;s wiki</Link>.
  </>,
  scriptRunner_close: () => `Close`,
  scriptRunner_run: () => `Run`,
  scriptRunner_isEvaluated: () => `The script has run successfully!`,
  scriptRunner_runtimeError: () => `Whops, the following error happened in your script:`,
  scriptRunner_syntaxError: () => `Whops, you have wrong syntax in your script:`,
  scriptRunner_logMessage: () => `Your script logged:`,
  scriptRunner_babelLoadingFailed: () => `Failed to load Babel. Check your internet connection and reload the page.`,
  scriptRunner_interpreterLoadingFailed: () => `Failed to load the interpreter. Check your internet connection and reload the page.`,

  palettes_apple: () => `Apple`,
  palettes_materialDesign: () => `Material Design`,
  palettes_css: () => `CSS colors`,
  palettes_themeColors: () => `The theme's colors`,
  palettes_themeCustomPalette: () => `The theme's custom palette`,

  paletteEditor_close: () => `Close`,
  paletteEditor_cancel: () => `Cancel`,
  paletteEditor_save: () => `Save`,
  paletteEditor_delete: () => `Delete`,
  paletteEditor_back: () => `Back to the variable`,
  paletteEditor_newColor: () => `Add a new color`,
  paletteEditor_title: () => `The theme's custom palette`,
  paletteEditor_defaultColorName: () => `Beautiful color`,
  paletteEditor_placeholder: () => `Whops, the palette is empty… Yet. Click the “Add a new color” button at the bottom or, if chat_wallpaper is assigned an image, open its editor and add the colors it suggests to this palette!`,
};

export default localization;

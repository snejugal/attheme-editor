import Link from "../link/component";
import React from "react";

const pluralRules = new Intl.PluralRules(`en`);

const localization = {
  error_title: () => `Whoops, some error happened.`,
  error_description: () => <React.Fragment>
    Please send a screenshot of the following error to {}
    <Link href="//t.me/snejugal" isWhite={true}>
      the developer on Telegram
    </Link>
    {} and describe what you did so the error happened. You may also need to send the original theme file you used.
  </React.Fragment>,
  error_dismiss: () => `To dismiss the error, just tap it.`,

  emptyWorkspace_title: () => `Start working on your theme`,
  emptyWorkspace_createTheme: () => `Create a new theme`,
  emptyWorkspace_openTheme: () => `Open an existing theme`,

  theme_defaultName: () => `Awesome Theme`,

  workspace_themeNameLabel: () => `Theme name`,
  workspace_closeTheme: () => `Close theme`,
  workspace_closeThemePrompt: () => `Are you sure you want to close the theme?`,
  workspace_downloadThemeFile: () => `Download .attheme directly`,
  workspace_createPreview: () => `Create a preview`,
  workspace_testTheme: () => `Test the theme`,
  workspace_downloadWorkspace: () => `Download the workspace`,
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

  confirmDialog_yes: () => `Yes`,
  confirmDialog_no: () => `No`,

  variableEditor_cancel: () => `Cancel`,
  variableEditor_save: () => `Save`,
  variableEditor_delete: () => `Delete`,
  variableEditor_red: () => `Red`,
  variableEditor_green: () => `Green`,
  variableEditor_blue: () => `Blue`,
  variableEditor_hex: () => `HEX`,
  variableEditor_alpha: () => `Alpha`,
  variableEditor_uploadImage: () => `Upload an image`,
};

export default localization;
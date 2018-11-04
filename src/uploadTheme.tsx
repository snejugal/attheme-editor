import * as atthemeEditorApi from "attheme-editor-api/lib/browser";
import prepareTheme from "./prepareTheme";

export default async (stateTheme: Theme) => {
  const { theme, name } = prepareTheme(stateTheme);

  const themeId = await atthemeEditorApi.uploadTheme({
    name,
    theme,
  });

  return themeId;
};

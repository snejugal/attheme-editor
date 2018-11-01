import * as atthemeEditorApi from "attheme-editor-api/browser";
import prepareTheme from "./prepareTheme";
import themeToObject from "attheme-js/lib/tools/themeToObject";

const uploadTheme = async (stateTheme) => {
  const { theme, name } = prepareTheme(stateTheme);

  const themeId = await atthemeEditorApi.uploadTheme({
    name,
    theme: themeToObject(theme),
  });

  return themeId;
};

export default uploadTheme;

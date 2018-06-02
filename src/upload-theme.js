import * as atthemeEditorApi from "attheme-editor-api";
import prepareTheme from "./prepare-theme";

const uploadTheme = async (stateTheme) => {
  const { theme, name } = prepareTheme(stateTheme);

  const themeId = await atthemeEditorApi.uploadTheme({
    name,
    theme,
  });

  return themeId;
};

export default uploadTheme;
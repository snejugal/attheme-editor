import { basename, extname } from "path";
import Attheme from "attheme-js";
import themeToObject from "attheme-js/lib/tools/themeToObject";

const parseTheme = ({ file, filename }) => {
  let variables;
  let wallpaper;
  let palette;
  let name;

  const extension = extname(filename);

  if (extension === `.attheme`) {
    const theme = new Attheme(file);

    wallpaper = btoa(theme.getWallpaper() || ``);
    name = basename(filename, extension);
    palette = [];
    theme.deleteWallpaper();
    variables = themeToObject(theme);
  } else if (extension === `.attheme-editor`) {
    const json = JSON.parse(file);

    ({ theme: variables, variables, wallpaper, palette, name } = json);
  }

  return {
    variables,
    wallpaper,
    palette,
    name,
  };
};

export default parseTheme;

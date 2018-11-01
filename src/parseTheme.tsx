import { basename } from "path";
import Attheme from "attheme-js";
import themeToObject from "attheme-js/lib/tools/themeToObject";

export default (theme: Attheme, name: string) => {
  const wallpaper = btoa(theme.getWallpaper() || ``);

  theme.deleteWallpaper();

  const variables = themeToObject(theme);

  return {
    variables,
    wallpaper,
    palette: [],
    name: basename(name, `.attheme`),
  };
};

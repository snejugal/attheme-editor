import { basename, extname } from "path";
import Attheme from "attheme-js";

const parseTheme = ({ file, filename }) => {
  let theme;
  let wallpaper;
  let palette;
  let name;

  const extension = extname(filename);

  if (extension === `.attheme`) {
    theme = new Attheme(file);

    wallpaper = btoa(theme[Attheme.IMAGE_KEY] || ``);
    name = basename(filename, extension);
    palette = [];

    delete theme[Attheme.IMAGE_KEY];
  } else if (extension === `.attheme-editor`) {
    const json = JSON.parse(file);

    ({ theme, wallpaper, palette, name } = json);
  }

  return {
    theme,
    wallpaper,
    palette,
    name,
  };
};

export default parseTheme;
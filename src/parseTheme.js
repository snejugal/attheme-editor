import { basename, extname } from "path";
import Attheme from "attheme-js";

const parseTheme = ({ file, filename }) => {
  let variables;
  let wallpaper;
  let palette;
  let name;

  const extension = extname(filename);

  if (extension === `.attheme`) {
    variables = new Attheme(file);

    wallpaper = btoa(variables[Attheme.IMAGE_KEY] || ``);
    name = basename(filename, extension);
    palette = [];

    delete variables[Attheme.IMAGE_KEY];
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

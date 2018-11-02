import Attheme from "attheme-js";
import { Color } from "attheme-js/lib/types";
import { allVariables } from "./atthemeVariables";

interface Parameters {
  variables: {
    [key: string]: Color;
  };
  name: string;
  wallpaper: string;
}

export default ({ variables, name, wallpaper }: Parameters) => {
  const theme = new Attheme();

  for (const variable in variables) {
    if (allVariables.includes(variable)) {
      theme.set(variable, variables[variable]);
    }
  }

  if (wallpaper) {
    theme.setWallpaper(atob(wallpaper));
  }

  return {
    theme,
    name,
  };
};

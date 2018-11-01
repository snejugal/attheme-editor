import Attheme from "attheme-js";
import { allVariables } from "./atthemeVariables";

export default ({ variables, name, wallpaper }) => {
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

import Attheme from "attheme-js";
import { allVariables, REMOVED_VARIABLES } from "./atthemeVariables";

export default ({ variables, name, wallpaper }: Theme) => {
  const theme = new Attheme();

  for (const variable in variables) {
    if (
      allVariables.includes(variable)
      // Keeping removed variables for compatibility
      || REMOVED_VARIABLES.some((data) => data.variable === variable)
    ) {
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

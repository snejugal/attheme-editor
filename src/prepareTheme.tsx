import Attheme from "attheme-js";
import VARIABLES from "attheme-js/lib/variables";
import { REMOVED_VARIABLES } from "./atthemeVariables";

export default ({ variables, name, wallpaper }: Theme) => {
  const theme = new Attheme();

  for (const variable in variables) {
    if (
      VARIABLES.includes(variable) ||
      // Keeping removed variables for compatibility
      REMOVED_VARIABLES.some(data => data.variable === variable)
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

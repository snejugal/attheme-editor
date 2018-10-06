import Attheme from "attheme-js";
import { allVariables } from "./atthemeVariables";

const prepareTheme = ({ variables, name, wallpaper }) => {
  const clearedVariables = {
    ...variables,
  };

  for (const variable in clearedVariables) {
    if (!allVariables.includes(variable)) {
      delete clearedVariables[variable];
    }
  }

  const theme = new Attheme(``, clearedVariables);

  if (wallpaper) {
    theme[Attheme.IMAGE_KEY] = atob(wallpaper);
  }

  return {
    theme,
    name,
  };
};

export default prepareTheme;

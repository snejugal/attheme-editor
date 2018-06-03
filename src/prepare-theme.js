import Attheme from "attheme-js";

const prepareTheme = ({ variables, name, wallpaper }) => {
  const theme = new Attheme(``, variables);

  if (wallpaper) {
    theme[Attheme.IMAGE_KEY] = atob(wallpaper);
  }

  return {
    theme,
    name,
  };
};

export default prepareTheme;
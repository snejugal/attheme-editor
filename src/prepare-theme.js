import Attheme from "attheme-js";

const prepareTheme = ({ theme, name, wallpaper }) => {
  const attheme = new Attheme(``, theme);

  if (wallpaper) {
    attheme[Attheme.IMAGE_KEY] = atob(wallpaper);
  }

  return {
    theme: attheme,
    name,
  };
};

export default prepareTheme;
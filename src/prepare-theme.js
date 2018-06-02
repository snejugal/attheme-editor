import Attheme from "attheme-js";

const prepareTheme = ({ theme, name, wallpaper }) => {
  const attheme = new Attheme(``, theme);

  if (wallpaper) {
    attheme[Attheme.IMAGE_KEY] = atob(wallpaper);
  }

  const fileName = `${name}.attheme`;

  return {
    theme: attheme,
    name,
    fileName,
  };
};

export default prepareTheme;
import englishLocalization from "./localizations/en";

const languages = [`en`, `ru`, `uk`, `it`, `uz`];

const localization = {
  ...englishLocalization,
};

const updatees = [];

const updateLanguage = async () => {
  let language = `en`;

  if (`languages` in navigator) {
    for (const fullLanguage of navigator.languages) {
      const shortLanguage = fullLanguage.slice(0, 2);

      if (languages.includes(shortLanguage)) {
        language = shortLanguage;

        break;
      }
    }
  } else if (`language` in navigator) {
    const shortLanguage = navigator.language.slice(0, 2);

    if (languages.includes(shortLanguage)) {
      language = shortLanguage;
    }
  }

  let loaded;

  try {
    ({ default: loaded } = await import(`./localizations/${language}`));
  } catch (e) {
    return;
  }

  Object.assign(localization, englishLocalization, loaded);
  updatees.forEach((updatee) => updatee());
};

updateLanguage();

window.addEventListener(`languagechange`, updateLanguage);

export default localization;

export const addUpdatee = (callback) => {
  updatees.push(callback);
};
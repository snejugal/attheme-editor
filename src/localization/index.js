import englishLocalization from "./en";

const LANGUAGE_NAME_LENGTH = 2;
const languages = [`en`, `ru`, `uk`, `it`, `uz`];

const localization = {
  ...englishLocalization,
};

const updatees = [];

const updateLanguage = async () => {
  let language = `en`;

  if (`languages` in navigator) {
    for (const fullLanguage of navigator.languages) {
      const shortLanguage = fullLanguage.slice(0, LANGUAGE_NAME_LENGTH);

      if (languages.includes(shortLanguage)) {
        language = shortLanguage;

        break;
      }
    }
  } else if (`language` in navigator) {
    const shortLanguage = navigator.language.slice(0, LANGUAGE_NAME_LENGTH);

    if (languages.includes(shortLanguage)) {
      language = shortLanguage;
    }
  }

  let loaded = {};

  if (language !== `en`) {
    try {
      ({ default: loaded } = await import(`./${language}`));
    } catch (e) {
      return;
    }
  }

  Object.assign(localization, englishLocalization, loaded);
  updatees.forEach((updatee) => updatee());
  document.documentElement.lang = language;
};

updateLanguage();

window.addEventListener(`languagechange`, updateLanguage);

export default localization;

export const addUpdatee = (callback) => {
  updatees.push(callback);
};
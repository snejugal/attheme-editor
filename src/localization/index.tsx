import english from "./en";
import { Localization } from "./types";
import defaultsDeep from "lodash/defaultsDeep";

const LANGUAGE_NAME_LENGTH = 2;
const languages = [`en`, `ru`, `uk`, `it`, `uz`, `es`];

const localization: Localization = {
  ...english,
};

const updatees: (() => void)[] = [];

const updateLanguage = async () => {
  let language = `en`;

  if (`languages` in navigator as any) {
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


  try {
    const { default: loaded } = await import(`./${language}`);

    Object.assign(localization, defaultsDeep({ ...loaded }, english));
    updatees.forEach((updatee) => updatee());
    document.documentElement!.lang = language;
  // eslint-disable-next-line
  } catch { };
};

updateLanguage();

window.addEventListener(`languagechange`, updateLanguage);

export default localization;

export const addUpdatee = (callback: () => void) => {
  updatees.push(callback);
};

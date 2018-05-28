import englishLocalization from "./localizations/en";

const languages = [`en`, `ru`];

const localization = {
  ...englishLocalization,
};

let language = `en`;

if (`languages` in navigator) {
  for (const fullLanguage of navigator.languages) {
    const shortLanguage = fullLanguage.slice(0, 2);

    if (languages.includes(shortLanguage)) {
      language = shortLanguage;
    }
  }
} else if (`language` in navigator) {
  const shortLanguage = navigator.language.slice(0, 2);

  if (languages.includes(shortLanguage)) {
    language = shortLanguage;
  }
}

if (language !== `en`) {
  import(`./localizations/${language}`)
    .then(({ default: loadedLocalization }) => {
      Object.assign(localization, loadedLocalization);
    });
}

export default localization;
import React from "react";
import Link from "../Link";
import { ReactComponent as LoveEmoji } from "../EmptyWorkspace/love.svg";
import { PartialLocalization, VariablesAmountProp } from "./types";

// eslint-disable-next-line quotes
type Forms = "one" | "few" | "many";

const pluralRules = new Intl.PluralRules(`uk`);
const select = (num: number): Forms => pluralRules.select(num) as Forms;

const NBSP = `\u{a0}`;

const localization: PartialLocalization = {
  dragAndDrop: {
    hint: `Перекиньте сюди файли .attheme або .attheme-editor`,
  },
  error: {
    title: `Упс, виникла помилка`,
    description: (
      <>
        Будь&nbsp;ласка, відправте скриншот помилки {}
        <Link href="//t.me/snejugal" isWhite={true}>
          розробнику по&nbsp;Телеграму
        </Link>
        {} и&nbsp;опишіть, що&nbsp;ви&nbsp;зробили, після чого виникла ця
        помилка. Мабуть треба буде відправити &nbsp;оригінальний файл&nbsp;теми,
        який ви&nbsp;використовували.
      </>
    ),
    dismiss: (
      <>
        Щоб закрити повідомлення про&nbsp;помилку, просто натисніть на&nbsp;неї.
      </>
    ),
  },
  emptyWorkspace: {
    title: `Почніть працювати над власною темою`,
    createTheme: <>Створити нову&nbsp;тему</>,
    openTheme: <>Відкрити існуючі&nbsp;теми</>,
    credits: (
      <>
        Редактор створено {}
        <Link href="//t.me/snejugal">@snejugal</Link>
        {} та {}
        <Link href="//t.me/AlexStrNik">@AlexStrNik</Link>
        {} та перевів на&nbsp;українську {}
        <Link href="//t.me/tfroke">@tfroke</Link>
        {} з {}
        <LoveEmoji className="emoji" />.{} Подивіться {}
        <Link href="//github.com/snejugal/attheme-editor">
          вихідний код редактора
        </Link>
        {} та підпишіться&nbsp;на {}
        <Link href="//t.me/atthemeeditor">наш канал у Телеграмі</Link>!
      </>
    ),
    uploadWaysHint: (
      <>
        Також можна перекинути сюди файл або використовувати {}
        <Link href="//t.me/atthemeeditorbot">@atthemeeditorbot</Link>,{} щоби
        відкривати теми через Телеграм.
      </>
    ),
  },
  theme: {
    defaultName: `Чудова${NBSP}тема`,
  },
  workspace: {
    themeNameLabel: <>Ім'я&nbsp;теми</>,
    closeTheme: <>Закрити&nbsp;тему</>,
    closeThemePrompt: `Ви впевнені, що бажаєте закрити тему?`,
    downloadThemeFile: `Завантажити файл .attheme`,
    createPreview: <>Створити&nbsp;прев'ю</>,
    testTheme: <>Протестувати&nbsp;тему</>,
    downloadWorkspace: <>Завантажити робоче &nbsp;точення</>,
    runScript: <>Запустити&nbsp;скрипт</>,
    editPalette: `Редагувати кастомну палітру теми`,
    unaddedVariable: <>Не&nbsp;додана</>,
    unusedVariable: `Не застосовується у Телеграмі`,
    obsoleteVariable: `Устаревшая`,
    nonStandardVariable: `Нестандартна`,
    search: `Пошук`,
    variablesAmount({ total, theme }: VariablesAmountProp) {
      const forms = {
        one: `${theme} змінна з ${total} додана у тему`,
        few: `${theme} змінні з ${total} додані у тему`,
        many: `${theme} змінних з ${total} додані у тему`,
      };

      return forms[select(theme)];
    },
    noVariablesPlaceholder: (
      <>У&nbsp;темі досі нема змінних :( Додайте їх через поле пошуку вище!</>
    ),
    noResultsPlaceholder: (
      <>Упс, пошук не&nbsp;дав ніяких результатів. Можливо, у запиті помилка.</>
    ),
    uploadError: `Упс, редактор не зміг завантажити тему боту. Перевірте з'єднання та спробуйте знову.`,
  },
  confirmDialog: {
    yes: `Так`,
    no: `Ні`,
  },
  variableEditor: {
    cancel: `Відмінити`,
    save: `Зберегти`,
    delete: `Видалити`,
    red: `Червоний`,
    green: `Зелений`,
    blue: `Синій`,
    hue: `Тон`,
    lightness: `Яскравість, %`,
    saturation: `Насиченість, %`,
    hex: `HEX`,
    alpha: `Альфа`,
    uploadImage: `Завантажити зображення`,
    downloadImage: `Завантажити картинку`,
    imageTab: `Зображення`,
    colorModelsTab: `Кольорові моделі`,
    palettesTab: `Палітри`,
    wallpaperColorsHint: (
      <>
        Ось декілька кольорів зі&nbsp;шпалер. Натисніть на колір, щоби додати
        його у палітру теми:
      </>
    ),
    editPalette: `Редагувати палітру`,
    themeColorsPlaceholder: `Упс, у темі досі нема ніяких кольорів.`,
    themeCustomPalettePlaceholder: (
      <>
        Упс, у кастомній палитрі нема кольорів… Поки&nbsp;що. Натисніть на
        кнопку «Редагувати палітру» вище!
      </>
    ),
  },
  scriptRunner: {
    title: `Запуск скриптів`,
    description: (
      <>
        .аttheme editor дозволяє легко запускати скрипти, написанні на
        EcmaScript 2017, що прискорює розробку тем. Про API редактора можна
        дізнатися в{" "}
        <Link href="//github.com/SnejUgal/attheme-editor/wiki/.attheme-editor-scripts-documentation">
          вікі GitHub репозиторію редактора
        </Link>
        .
      </>
    ),
    close: `Закрити`,
    run: `Запустити`,
    isEvaluated: `Скрипт успішно виконано!`,
    runtimeError: `Упс, у скрипті виникла помилка`,
    syntaxError: `Упс, у скрипті невірний синтаксис`,
    logMessage: `Ваш скрипт передан до консолі:`,
    babelLoadingFailed: `Не вдалося завантажити Babel. Перевірте з'єднання та перезавантажте сторінку.`,
    interpreterLoadingFailed: `Не вдалося завантажити інтерпретатор. Перевірте з'єднання та перезавантажте сторінку.`,
  },
  palettes: {
    apple: `Apple`,
    materialDesign: `Material Design`,
    css: `CSS кольори`,
    themeColors: `Кольори теми`,
    themeCustomPalette: `Кастомна палітра теми`,
  },
  paletteEditor: {
    close: `Закрити`,
    cancel: `Відмінити`,
    save: `Зберегти`,
    delete: `Видалити`,
    back: `Назад до змінної`,
    newColor: `Додати новий колір`,
    title: `Кастомна палітра теми`,
    defaultColorName: `Красивий колір`,
    placeholder: (
      <>
        Упс, палітра порожня… Поки що. Натисніть на кнопку «Додати новий колір»
        або, якщо&nbsp;на chat_wallpaper стоїть картинка, відкрийте редактор
        цієї змінної та додайте кольори, які він пропонує!
      </>
    ),
  },
};

export default localization;

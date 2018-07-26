import Link from "../link/component";
import { ReactComponent as LoveEmoji } from "../empty-workspace/love.svg";
import React from "react";

const NBSP = `\xa0`;

const pluralRules = new Intl.PluralRules(`uk`);

const localization = {
  dropHint: () => `Перекиньте сюди файли .attheme або .attheme-editor`,

  error_title: () => `Упс, виникла помилка`,
  error_description: () => <React.Fragment>
    Будь&nbsp;ласка, відправте скриншот помилки {}
    <Link href="//t.me/snejugal" isWhite={true}>
      розробнику по&nbsp;Телеграму
    </Link>
    {} и&nbsp;опишіть, що&nbsp;ви&nbsp;зробили, після чого виникла ця помилка.  Мабуть треба буде відправити &nbsp;оригінальний файл&nbsp;теми, який ви&nbsp;використовували.
  </React.Fragment>,
  error_dismiss: () => `Щоб закрити повідомлення про${NBSP}помилку, просто натисніть на${NBSP}неї.`,

  emptyWorkspace_title: () => `Почніть працювати над власною темою`,
  emptyWorkspace_createTheme: () => `Створити нову${NBSP}тему`,
  emptyWorkspace_openTheme: () => `Відкрити існуючі${NBSP}теми`,
  emptyWorkspace_credits: () => <React.Fragment>
    Редактор створено {}
    <Link href="//t.me/snejugal">@snejugal</Link>
    {} та {}
    <Link href="//t.me/AlexStrNik">@AlexStrNik</Link>
    {} та перевів на&nbsp;українську {}
    <Link href="//t.me/tfroke">@tfroke</Link>
    {} з {}
    <LoveEmoji className="emoji" />.
    {} Подивіться {}
    <Link href="//github.com/snejugal/attheme-editor">
      вихідний код редактора
    </Link>
    {} та підпишіться&nbsp;на {}
    <Link href="//t.me/atthemeeditor">
      наш канал у Телеграмі
    </Link>!
  </React.Fragment>,
  emptyWorkspace_uploadWaysHint: () => <React.Fragment>
    Також можна перекинути сюди файл або використовувати {}
    <Link href="//t.me/atthemeeditorbot">@atthemeeditorbot</Link>,
    {} щоби відкривати теми через Телеграм.
  </React.Fragment>,

  theme_defaultName: () => `Чудова${NBSP}тема`,

  workspace_themeNameLabel: () => `Ім'я${NBSP}теми`,
  workspace_closeTheme: () => `Закрити${NBSP}тему`,
  workspace_closeThemePrompt: () => `Ви впевнені, що бажаєте закрити тему?`,
  workspace_downloadThemeFile: () => `Завантажити файл .attheme`,
  workspace_createPreview: () => `Створити${NBSP}прев'ю`,
  workspace_testTheme: () => `Протестувати${NBSP}тему`,
  workspace_downloadWorkspace: () => `Завантажити робоче ${NBSP}точення`,
  workspace_runScript: () => `Запустити${NBSP}скрипт`,
  workspace_editPalette: () => `Редагувати кастомну палітру теми`,
  workspace_unaddedVariable: () => `Не${NBSP}додана`,
  workspace_unusedVariable: () => `Не застосовується у Телеграмі`,
  workspace_obsoleteVariable: () => `Устаревшая`,
  workspace_nonStandardVariable: () => `Нестандартна`,
  workspace_search: () => `Пошук`,
  workspace_variablesAmount: ({ total, theme }) => {
    const forms = {
      one: `${theme} змінна з ${total} додана у тему`,
      few: `${theme} змінні з ${total} додані у тему`,
      many: `${theme} змінних з ${total} додані у тему`,
    };

    return forms[pluralRules.select(theme)];
  },
  workspace_noVariablesPlaceholder: () => `У${NBSP}темі досі нема змінних :( Додайте їх через поле пошуку вище!`,
  workspace_noResultsPlaceholder: () => `Упс, пошук не${NBSP}дав ніяких результатів. Можливо, у запиті помилка.`,
  workspace_uploadError: () => `Упс, редактор не зміг завантажити тему боту. Перевірте з'єднання та спробуйте знову.`,

  confirmDialog_yes: () => `Так`,
  confirmDialog_no: () => `Ні`,

  variableEditor_cancel: () => `Відмінити`,
  variableEditor_save: () => `Зберегти`,
  variableEditor_delete: () => `Видалити`,
  variableEditor_red: () => `Червоний`,
  variableEditor_green: () => `Зелений`,
  variableEditor_blue: () => `Синій`,
  variableEditor_hue: () => `Тон`,
  variableEditor_lightness: () => `Яскравість, %`,
  variableEditor_saturation: () => `Насиченість, %`,
  variableEditor_hex: () => `HEX`,
  variableEditor_alpha: () => `Альфа`,
  variableEditor_uploadImage: () => `Завантажити зображення`,
  variableEditor_imageTab: () => `Зображення`,
  variableEditor_colorModelsTab: () => `Кольорові моделі`,
  variableEditor_palettesTab: () => `Палітри`,
  variableEditor_wallpaperColorsHint: () => `Ось декілька кольорів зі${NBSP}шпалер. Натисніть на колір, щоби додати його у палітру теми:`,
  variableEditor_editPalette: () => `Редагувати палітру`,
  variableEditor_themeColorsPlaceholder: () => `Упс, у темі досі нема ніяких кольорів.`,
  variableEditor_themeCustomPalettePlaceholder: () => `Упс, у кастомній палитрі нема кольорів… Поки${NBSP}що. Натисніть на кнопку «Редагувати палітру» вище!`,

  scriptRunner_title: () => `Запуск скриптів`,
  scriptRunner_description: () => <React.Fragment>
    .аttheme editor дозволяє легко запускати скрипти, написанні на EcmaScript 2017, що прискорює розробку тем. Про API редактора можна дізнатися в <Link href="//github.com/SnejUgal/attheme-editor/wiki/.attheme-editor-scripts-documentation">вікі GitHub репозиторію редактора</Link>.
  </React.Fragment>,
  scriptRunner_close: () => `Закрити`,
  scriptRunner_run: () => `Запустити`,
  scriptRunner_isEvaluated: () => `Скрипт успішно виконано!`,
  scriptRunner_runtimeError: () => `Упс, у скрипті виникла помилка`,
  scriptRunner_syntaxError: () => `Упс, у скрипті невірний синтаксис`,
  scriptRunner_logMessage: () => `Ваш скрипт передан до консолі:`,
  scriptRunner_babelLoadingFailed: () => `Не вдалося завантажити Babel. Перевірте з'єднання та перезавантажте сторінку.`,
  scriptRunner_interpreterLoadingFailed: () => `Не вдалося завантажити інтерпретатор. Перевірте з'єднання та перезавантажте сторінку.`,

  palettes_apple: () => `Apple`,
  palettes_materialDesign: () => `Material Design`,
  palettes_css: () => `CSS кольори`,
  palettes_themeColors: () => `Кольори теми`,
  palettes_themeCustomPalette: () => `Кастомна палітра теми`,

  paletteEditor_close: () => `Закрити`,
  paletteEditor_cancel: () => `Відмінити`,
  paletteEditor_save: () => `Зберегти`,
  paletteEditor_delete: () => `Видалити`,
  paletteEditor_back: () => `Назад до змінної`,
  paletteEditor_newColor: () => `Додати новий колір`,
  paletteEditor_title: () => `Кастомна палітра теми`,
  paletteEditor_defaultColorName: () => `Красивий колір`,
  paletteEditor_placeholder: () => `Упс, палітра порожня… Поки що. Натисніть на кнопку «Додати новий колір» або, якщо${NBSP}на chat_wallpaper стоїть картинка, відкрийте редактор цієї змінної та додайте кольори, які він пропонує!`,
};

export default localization;

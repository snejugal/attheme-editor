import Link from "../link/component";
import { ReactComponent as LoveEmoji } from "../empty-workspace/love.svg";
import React from "react";

const NBSP = `\xa0`;

const pluralRules = new Intl.PluralRules(`uk`);

const localization = {
  error_title: () => `Упс, виникла помилка`,
  error_description: () => <React.Fragment>
    Будь ласка, відправте скриншот помилки {}
    <Link href="//t.me/snejugal" isWhite={true}>
      розробнику по&nbsp;Телеграму
    </Link>
    {} и&nbsp;опишіть, що&nbsp;ви&nbsp;зробили, після чого виникла ця помилка.  Мабуть треба буде відправити &nbsp;оригінальний файл теми, який ви&nbsp;використовували.
  </React.Fragment>,
  error_dismiss: () => `Щоб закрити повідомлення про${NBSP}помилку, просто натисніть на неї.`,

  emptyWorkspace_title: () => `Почніть працювати над власною темою`,
  emptyWorkspace_createTheme: () => `Створити нову тему`,
  emptyWorkspace_openTheme: () => `Відкрити існуючу тему`,
  emptyWorkspace_credits: () => <React.Fragment>
    Редактор створено {}
    <Link href="//t.me/snejugal">@snejugal</Link>
    {} та {}
    <Link href="//t.me/AlexStrNik">@AlexStrNik</Link>
    {} та перевів на українську {}
    <Link href="//t.me/tfroke">@tfroke</Link>
    {} з {}
    <LoveEmoji className="emoji" />.
    {} Подивіться {}
    <Link href="//github.com/snejugal/attheme-editor">
      вихідний код редактора
    </Link>
    {} та підпишіться на {}
    <Link href="//t.me/atthemeeditor">
      наш канал у Телеграмі
    </Link>!
  </React.Fragment>,

  theme_defaultName: () => `Чудова тема`,

  workspace_themeNameLabel: () => `Ім'я теми`,
  workspace_closeTheme: () => `Закрити тему`,
  workspace_closeThemePrompt: () => `Ви впевнені, що бажаєте закрити тему?`,
  workspace_downloadThemeFile: () => `Завантажити файл .attheme`,
  workspace_createPreview: () => `Створити прев'ю`,
  workspace_testTheme: () => `Протестувати тему`,
  workspace_downloadWorkspace: () => `Завантажити робоче оточення`,
  workspace_runScript: () => `Запустити скрипт`,
  workspace_editPalette: () => `Редагувати кастомну палітру теми`,
  workspace_unaddedVariable: () => `Не додана`,
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
  variableEditor_wallpaperColorsHint: () => `Ось декілька кольорів зі шпалер. Натисніть на колір, щоби додати його у палітру теми:`,
  variableEditor_editPalette: () => `Редагувати палітру`,

  scriptRunner_title: () => `Запуск скриптів`,
  scriptRunner_description: () => <React.Fragment>
    .аttheme editor дозволяє легко запускати скрипти, написанні на EcmaScript 2017, що прискорює розробку тем. Про API редактора можна дізнатися в <Link href="//github.com/SnejUgal/attheme-editor/wiki/.attheme-editor-scripts-documentation">вікі GitHub репозиторію редактора</Link>.
  </React.Fragment>,
  scriptRunner_close: () => `Закрити`,
  scriptRunner_run: () => `Запустити`,
  scriptRunner_isEvaluating: () => `Скрипт виконується…`,
  scriptRunner_isEvaluated: () => `Скрипт успішно виконано!`,
  scriptRunner_runtimeError: () => `Упс, у скрипті виникла помилка`,
  scriptRunner_syntaxError: () => `Упс, у скрипті невірний синтаксис`,
  scriptRunner_logMessage: () => `Ваш скрипт передан до консолі:`,
  scriptRunner_babelLoadingFailed: () => `Не вдалося завантажити Babel. Перевірте з'єднання та перезавантажте сторінку.`,

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
};

export default localization;
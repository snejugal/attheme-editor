import Link from "../link/component";
import { ReactComponent as LoveEmoji } from "../empty-workspace/love.svg";
import React from "react";

const NBSP = `\xa0`;

const pluralRules = new Intl.PluralRules(`ru`);

const localization = {
  dropHint: () => `Перекиньте сюда файлы .attheme или${NBSP}.attheme-editor `,

  error_title: () => `Упс, произошла ошибка`,
  error_description: () => <React.Fragment>
    Пожалуйста, отправьте скриншот ошибки {}
    <Link href="//t.me/snejugal" isWhite={true}>
      разработчику по&nbsp;Телеграму
    </Link>
    {} и&nbsp;опишите, что&nbsp;вы&nbsp;сделали, после чего возникла ошибка. Возможно, понадобится отправить и&nbsp;оригинальный файл темы, который вы&nbsp;использовали.
  </React.Fragment>,
  error_dismiss: () => `Чтобы закрыть сообщение об${NBSP}ошибке, просто нажмите на${NBSP}него.`,

  emptyWorkspace_title: () => `Начните работать над${NBSP}своей темой`,
  emptyWorkspace_createTheme: () => `Создать новую тему`,
  emptyWorkspace_openTheme: () => `Открыть существующие темы`,
  emptyWorkspace_credits: () => <React.Fragment>
    Редактор создан {}
    <Link href="//t.me/snejugal">@snejugal</Link>
    {} и&nbsp;
    <Link href="//t.me/AlexStrNik">@AlexStrNik</Link>
    {} с&nbsp;
    <LoveEmoji className="emoji" />.
    {} Посмотрите {}
    <Link href="//github.com/snejugal/attheme-editor">
      исходный код редактора на&nbsp;GitHub
    </Link>
    {} и&nbsp;подпишитесь на&nbsp;
    <Link href="//t.me/atthemeeditor">
      наш канал в&nbsp;Телеграме
    </Link>!
  </React.Fragment>,
  emptyWorkspace_uploadWaysHint: () => <React.Fragment>
    Также можно перекинуть сюда файл или&nbsp;использовать {}
    <Link href="//t.me/atthemeeditorbot">@atthemeeditorbot</Link>,
    {} чтобы открывать темы через&nbsp;Телеграм.
  </React.Fragment>,

  theme_defaultName: () => `Классная тема`,

  workspace_themeNameLabel: () => `Название темы`,
  workspace_closeTheme: () => `Закрыть тему`,
  workspace_closeThemePrompt: () => `Вы уверены, что${NBSP}хотите закрыть тему?`,
  workspace_downloadThemeFile: () => `Скачать .attheme напрямую`,
  workspace_createPreview: () => `Создать превью`,
  workspace_testTheme: () => `Протестировать тему`,
  workspace_runScript: () => `Запустить скрипт`,
  workspace_editPalette: () => `Редактировать кастомную палитру темы`,
  workspace_downloadWorkspace: () => `Скачать рабочее окружение`,
  workspace_unaddedVariable: () => `Не${NBSP}добавлена`,
  workspace_unusedVariable: () => `Не используется Телеграмом`,
  workspace_obsoleteVariable: () => `Устаревшая`,
  workspace_nonStandardVariable: () => `Нестандартная`,
  workspace_search: () => `Поиск`,
  workspace_variablesAmount: ({ total, theme }) => {
    const forms = {
      one: `${theme} переменная из${NBSP}${total} добавлена в${NBSP}тему`,
      few: `${theme} переменные из${NBSP}${total} добавлены в${NBSP}тему`,
      many: `${theme} переменных из${NBSP}${total} добавлены в${NBSP}тему`,
    };

    return forms[pluralRules.select(theme)];
  },
  workspace_noVariablesPlaceholder: () => `В${NBSP}теме ещё нет${NBSP}переменных :( Добавьте их${NBSP}через${NBSP}поле поиска выше!`,
  workspace_noResultsPlaceholder: () => `Упс, поиск не${NBSP}дал никаких результатов. Может, в${NBSP}запросе есть опечатка?`,
  workspace_uploadError: () => `Упс, редактор не${NBSP}смог загрузить тему боту. Проверьте соединение и${NBSP}попробуйте снова.`,

  confirmDialog_yes: () => `Да`,
  confirmDialog_no: () => `Нет`,

  variableEditor_cancel: () => `Отменить`,
  variableEditor_save: () => `Сохранить`,
  variableEditor_delete: () => `Удалить`,
  variableEditor_red: () => `Красный`,
  variableEditor_green: () => `Зелёный`,
  variableEditor_blue: () => `Синий`,
  variableEditor_hue: () => `Тон`,
  variableEditor_lightness: () => `Светлость, %`,
  variableEditor_saturation: () => `Насыщенность, %`,
  variableEditor_hex: () => `HEX`,
  variableEditor_alpha: () => `Альфа`,
  variableEditor_uploadImage: () => `Загрузить картинку`,
  variableEditor_imageTab: () => `Картинка`,
  variableEditor_colorModelsTab: () => `Цветовые модели`,
  variableEditor_palettesTab: () => `Палитры`,
  variableEditor_wallpaperColorsHint: () => `Вот несколько цветов из${NBSP}обоев. Нажмите на${NBSP}цвет, чтобы добавить его в${NBSP}палитру темы:`,
  variableEditor_editPalette: () => `Редактировать палитру`,
  variableEditor_themeColorsPlaceholder: () => `Упс, в${NBSP}теме ещё нет никаких цветов.`,
  variableEditor_themeCustomPalettePlaceholder: () => `Упс, в${NBSP}кастомной палитре нет цветов… пока${NBSP}что. Нажмите на кнопку «Редактировать палитру» выше!`,

  scriptRunner_title: () => `Запуск скриптов`,
  scriptRunner_description: () => <React.Fragment>
    .attheme editor позволяет легко запускать скрипты, написанные на&nbsp;EcmaScript 2017, что ускоряет разработку тем. Про API редактора можно узнать в&nbsp;<Link href="//github.com/SnejUgal/attheme-editor/wiki/.attheme-editor-scripts-documentation">вики GitHub репозитория редактора</Link>.
  </React.Fragment>,
  scriptRunner_close: () => `Закрыть`,
  scriptRunner_run: () => `Запустить`,
  scriptRunner_isEvaluated: () => `Скрипт успешно выполнился!`,
  scriptRunner_runtimeError: () => `Упс, в${NBSP}скрипте произошла ошибка:`,
  scriptRunner_syntaxError: () => `Упс, в${NBSP}скрипте неверный синтаксис:`,
  scriptRunner_logMessage: () => `Ваш скрипт передал в${NBSP}консоль:`,
  scriptRunner_babelLoadingFailed: () => `Не удалось загрузить Babel. Проверьте соединение и${NBSP}перезагрузите страницу.`,
  scriptRunner_interpreterLoadingFailed: () => `Не удалось загрузить интерпретатор. Проверьте соединение и${NBSP}перезагрузите страницу.`,

  palettes_apple: () => `Apple`,
  palettes_materialDesign: () => `Material Design`,
  palettes_css: () => `CSS цвета`,
  palettes_themeColors: () => `Цвета темы`,
  palettes_themeCustomPalette: () => `Кастомная палитра темы`,

  paletteEditor_close: () => `Закрыть`,
  paletteEditor_cancel: () => `Отменить`,
  paletteEditor_save: () => `Сохранить`,
  paletteEditor_delete: () => `Удалить`,
  paletteEditor_back: () => `Обратно к${NBSP}переменной`,
  paletteEditor_newColor: () => `Добавить новый цвет`,
  paletteEditor_title: () => `Кастомная палитра темы`,
  paletteEditor_defaultColorName: () => `Красивый цвет`,
  paletteEditor_placeholder: () => `Упс, палитра пустая… пока${NBSP}что. Нажмите на кнопку «Добавить новый цвет» или, если на${NBSP}chat_wallpaper стоит картинка, откройте редактор этой переменной и${NBSP}добавьте цвета, которые он${NBSP}предлагает!`,
};

export default localization;
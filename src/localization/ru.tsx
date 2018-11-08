import React from "react";
import Link from "../Link";
import { ReactComponent as LoveEmoji } from "../EmptyWorkspace/love.svg";
import { PartialLocalization, VariablesAmountProp } from "./types";

// eslint-disable-next-line quotes
type Forms = "one" | "few" | "many";

const pluralRules = new Intl.PluralRules(`ru`);
const select = (num: number): Forms => pluralRules.select(num) as Forms;

const NBSP = `\u{a0}`;

const localization: PartialLocalization = {
  dragAndDrop: {
    hint: `Перекиньте сюда файлы .attheme или${NBSP}.attheme-editor`,
  },
  error: {
    title: `Упс, произошла ошибка`,
    description: <>
      Пожалуйста, отправьте скриншот ошибки {}
      <Link href="//t.me/snejugal" isWhite={true}>
        разработчику по&nbsp;Телеграму
      </Link>
      {} и&nbsp;опишите, что&nbsp;вы&nbsp;сделали, после чего возникла ошибка. Возможно, понадобится отправить и&nbsp;оригинальный файл темы, который вы&nbsp;использовали.
    </>,
    dismiss: <>Чтобы закрыть сообщение об&nbsp;ошибке, просто нажмите на&nbsp;него.</>,
  },
  emptyWorkspace: {
    title: <>Начните работать над&nbsp;своей темой</>,
    createTheme: `Создать новую тему`,
    openTheme: `Открыть существующие темы`,
    credits: <>
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
    </>,
    uploadWaysHint: <>
      Также можно перекинуть сюда файл или&nbsp;использовать {}
      <Link href="//t.me/atthemeeditorbot">@atthemeeditorbot</Link>,
      {} чтобы открывать темы через&nbsp;Телеграм.
    </>,
  },
  theme: {
    defaultName: `Классная тема`,
  },
  workspace: {
    themeNameLabel: `Название темы`,
    closeTheme: `Закрыть тему`,
    closeThemePrompt: <>Вы уверены, что&nbsp;хотите закрыть тему?</>,
    downloadThemeFile: `Скачать .attheme напрямую`,
    createPreview: `Создать превью`,
    testTheme: `Протестировать тему`,
    runScript: `Запустить скрипт`,
    editPalette: `Редактировать кастомную палитру темы`,
    downloadWorkspace: `Скачать рабочее окружение`,
    unaddedVariable: <>Не&nbsp;добавлена</>,
    unusedVariable: `Не используется Телеграмом`,
    obsoleteVariable: `Устаревшая`,
    nonStandardVariable: `Нестандартная`,
    search: `Поиск`,
    variablesAmount({ total, theme }: VariablesAmountProp) {
      const forms = {
        one: <>{theme} переменная из&nbsp;{total} добавлена в&nbsp;тему</>,
        few: <>{theme} переменные из&nbsp;{total} добавлены в&nbsp;тему</>,
        many: <>{theme} переменных из&nbsp;{total} добавлены в&nbsp;тему</>,
      };

      return forms[select(theme)];
    },
    noVariablesPlaceholder: <>В&nbsp;теме ещё нет&nbsp;переменных :( Добавьте их&nbsp;через&nbsp;поле поиска выше!</>,
    noResultsPlaceholder: <>Упс, поиск не&nbsp;дал никаких результатов. Может, в&nbsp;запросе есть опечатка?</>,
    uploadError: <>Упс, редактор не&nbsp;смог загрузить тему боту. Проверьте соединение и&nbsp;попробуйте снова.</>,
  },
  confirmDialog: {
    yes: `Да`,
    no: `Нет`,
  },
  variableEditor: {
    cancel: `Отменить`,
    save: `Сохранить`,
    delete: `Удалить`,
    red: `Красный`,
    green: `Зелёный`,
    blue: `Синий`,
    hue: `Тон`,
    lightness: `Светлость, %`,
    saturation: `Насыщенность, %`,
    hex: `HEX`,
    alpha: `Альфа`,
    uploadImage: `Загрузить картинку`,
    downloadImage: `Скачать картинку`,
    imageTab: `Картинка`,
    colorModelsTab: `Цветовые модели`,
    palettesTab: `Палитры`,
    wallpaperColorsHint: <>Вот несколько цветов из&nbsp;обоев. Нажмите на&nbsp;цвет, чтобы добавить его в&nbsp;палитру темы:</>,
    editPalette: `Редактировать палитру`,
    themeColorsPlaceholder: <>Упс, в&nbsp;теме ещё нет никаких цветов.</>,
    themeCustomPalettePlaceholder: <>Упс, в&nbsp;кастомной палитре нет цветов… пока&nbsp;что. Нажмите на кнопку «Редактировать палитру» выше!</>,
  },
  scriptRunner: {
    title: `Запуск скриптов`,
    description: <>
      .attheme editor позволяет легко запускать скрипты, написанные на&nbsp;EcmaScript 2017, что ускоряет разработку тем. Про API редактора можно узнать в&nbsp;<Link href="//github.com/SnejUgal/attheme-editor/wiki/.attheme-editor-scripts-documentation">вики GitHub репозитория редактора</Link>.
    </>,
    close: `Закрыть`,
    run: `Запустить`,
    isEvaluated: `Скрипт успешно выполнился!`,
    runtimeError: <>Упс, в&nbsp;скрипте произошла ошибка:</>,
    syntaxError: <>Упс, в&nbsp;скрипте неверный синтаксис:</>,
    logMessage: <>Ваш скрипт передал в&nbsp;консоль:</>,
    babelLoadingFailed: <>Не удалось загрузить Babel. Проверьте соединение и&nbsp;перезагрузите страницу.</>,
    interpreterLoadingFailed: <>Не удалось загрузить интерпретатор. Проверьте соединение и&nbsp;перезагрузите страницу.</>,
  },
  palettes: {
    apple: `Apple`,
    materialDesign: `Material Design`,
    css: `CSS цвета`,
    themeColors: `Цвета темы`,
    themeCustomPalette: `Кастомная палитра темы`,
  },
  paletteEditor: {
    close: `Закрыть`,
    cancel: `Отменить`,
    save: `Сохранить`,
    delete: `Удалить`,
    back: <>Обратно к&nbsp;переменной</>,
    newColor: `Добавить новый цвет`,
    title: `Кастомная палитра темы`,
    defaultColorName: `Красивый цвет`,
    placeholder: <>Упс, палитра пустая… пока&nbsp;что. Нажмите на кнопку «Добавить новый цвет» или, если на&nbsp;chat_wallpaper стоит картинка, откройте редактор этой переменной и&nbsp;добавьте цвета, которые он&nbsp;предлагает!</>,
  },
};

export default localization;

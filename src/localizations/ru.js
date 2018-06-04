import Link from "../link/component";
import React from "react";

const NBSP = `\xa0`;

const pluralRules = new Intl.PluralRules(`ru`);

const localization = {
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
  emptyWorkspace_openTheme: () => `Открыть существующую тему`,

  theme_defaultName: () => `Классная тема`,

  workspace_themeNameLabel: () => `Название темы`,
  workspace_closeTheme: () => `Закрыть тему`,
  workspace_closeThemePrompt: () => `Вы уверены, что хотите закрыть тему?`,
  workspace_downloadThemeFile: () => `Скачать .attheme напрямую`,
  workspace_createPreview: () => `Создать превью`,
  workspace_testTheme: () => `Протестировать тему`,
  workspace_downloadWorkspace: () => `Скачать рабочее окружение`,
  workspace_unaddedVariable: () => `Не добавлена`,
  workspace_search: () => `Поиск`,
  workspace_variablesAmount: ({ total, theme }) => {
    const forms = {
      one: `${theme} переменная из ${total} добавлена в тему`,
      few: `${theme} переменные из ${total} добавлены в тему`,
      many: `${theme} переменных из ${total} добавлены в тему`,
    };

    return forms[pluralRules.select(theme)];
  },

  confirmDialog_yes: () => `Да`,
  confirmDialog_no: () => `Нет`,

  variableEditor_cancel: () => `Отменить`,
  variableEditor_save: () => `Сохранить`,
  variableEditor_delete: () => `Удалить`,
  variableEditor_red: () => `Красный`,
  variableEditor_green: () => `Зелёный`,
  variableEditor_blue: () => `Синий`,
  variableEditor_hex: () => `HEX`,
  variableEditor_alpha: () => `Альфа`,
  variableEditor_uploadImage: () => `Загрузить картинку`,
};

export default localization;
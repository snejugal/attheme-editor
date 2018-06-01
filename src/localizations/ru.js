import Link from "../link/component";
import React from "react";

const NBSP = `\xa0`;

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

  confirmDialog_yes: () => `Да`,
  confirmDialog_no: () => `Нет`,
};

export default localization;
import React from "react";

const NBSP = `\xa0`;

const stopPropagation = (event) => event.stopPropagation();

const localization = {
  error_title: () => `Упс, произошла ошибка`,
  error_description: () => <React.Fragment>
    Пожалуйста, отправьте скриншот ошибки {}
    <a
      className="link -white"
      href="//t.me/snejugal"
      target="_blank"
      rel="noopener noreferrer"
      onClick={stopPropagation}
    >
      разработчику по&nbsp;Телеграму
    </a>
    {} и&nbsp;опишите, что&nbsp;вы&nbsp;сделали, после чего возникла ошибка. Возможно, понадобится отправить и&nbsp;оригинальный файл темы, который вы&nbsp;использовали.
  </React.Fragment>,
  error_dismiss: () => `Чтобы закрыть сообщение об${NBSP}ошибке, нажмите него.`,
};

export default localization;
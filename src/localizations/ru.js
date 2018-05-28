import React from "react";

const localization = {
  error_title: () => `Упс, произошла ошибка`,
  error_description: () => <React.Fragment>
    Пожалуйста, отправьте скриншот ошибки <a href="//t.me/snejugal" target="_blank" rel="noopener noreferrer">разработчику по Телеграму</a> и опишите, что вы сделали, после чего возникла ошибка. Возможно, понадобится отправить и оригинальный файл темы, который вы использовали.
  </React.Fragment>,
};

export default localization;
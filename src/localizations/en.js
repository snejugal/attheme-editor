import React from "react";

const stopPropagation = (event) => event.stopPropagation();

const localization = {
  error_title: () => `Whoops, some error happened.`,
  error_description: () => <React.Fragment>
    Please send a screenshot of the following error to
    <a
      className="link -white"
      href="//t.me/snejugal"
      target="_blank"
      rel="noopener noreferrer"
      onClick={stopPropagation}
    >
      the developer on Telegram
    </a>
    and describe what you did so the error happened. You may also need to send the original theme file you used.
  </React.Fragment>,
  error_dismiss: () => `To dissmiss the error, tap it.`,
};

export default localization;
import React from "react";

const localization = {
  error_title: () => `Whoops, some error happened.`,
  error_description: () => <React.Fragment>
    Please send a screenshot of the following error to <a href="//t.me/snejugal" target="_blank" rel="noopener noreferrer">the developer on Telegram</a> and describe what you did so the error happened. You may also need to send the original theme file you used.
  </React.Fragment>,
};

export default localization;
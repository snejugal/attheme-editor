import Link from "../link/component";
import React from "react";

const localization = {
  error_title: () => `Whoops, some error happened.`,
  error_description: () => <React.Fragment>
    Please send a screenshot of the following error to {}
    <Link href="//t.me/snejugal" isWhite={true}>
      the developer on Telegram
    </Link>
    {} and describe what you did so the error happened. You may also need to send the original theme file you used.
  </React.Fragment>,
  error_dismiss: () => `To dismiss the error, just tap it.`,

  emptyWorkspace_title: () => `Start working on your theme`,
  emptyWorkspace_createTheme: () => `Create a new theme`,
  emptyWorkspace_openTheme: () => `Open an existing theme`,

  theme_defaultName: () => `Awesome Theme`,

  workspace_themeNameLabel: () => `Theme name`,
};

export default localization;
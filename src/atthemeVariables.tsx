import defaultTheme from "attheme-js/lib/defaultThemes/default";
import { Color } from "attheme-js/lib/types";

interface DefaultValues {
  [key: string]: Color;
}

interface RemovedVariables {
  [key: string]: string;
}

// These are actually removed variables too, but it's hard to determine the
// version they were removed in, so we keep them as obsolete.
export const OBSOLETE_VARIABLES = [
  `listSelector`,
  `player_seekBarBackground`,
  `player_duration`,
];

export const UNUSED_VARIABLES = [
  `chat_mediaBroadcast`,
  `chat_outBroadcast`,
  `windowBackgroundWhiteBlueText2`,
];

export const REMOVED_VARIABLES = [
  {
    variable: `avatar_subtitleInProfilePink`,
    version: `5.0.0`,
  },
  {
    variable: `switch2Thumb`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_actionBarIconViolet`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_subtitleInProfileCyan`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_actionBarIconOrange`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_backgroundInProfileOrange`,
    version: `5.0.0`,
  },
  {
    variable: `switch2ThumbChecked`,
    version: `5.0.0`,
  },
  {
    variable: `switchThumbChecked`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_actionBarIconPink`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_actionBarSelectorCyan`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_subtitleInProfileViolet`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_actionBarIconCyan`,
    version: `5.0.0`,
  },
  {
    variable: `switch2Check`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_actionBarSelectorPink`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_backgroundInProfilePink`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_subtitleInProfileGreen`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_backgroundActionBarRed`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_backgroundActionBarOrange`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_actionBarSelectorOrange`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_actionBarIconGreen`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_backgroundActionBarCyan`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_subtitleInProfileOrange`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_actionBarSelectorRed`,
    version: `5.0.0`,
  },
  {
    variable: `switchThumb`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_backgroundInProfileCyan`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_backgroundActionBarViolet`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_subtitleInProfileRed`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_actionBarSelectorGreen`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_backgroundActionBarGreen`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_backgroundActionBarPink`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_backgroundInProfileRed`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_backgroundInProfileViolet`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_actionBarSelectorViolet`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_backgroundInProfileGreen`,
    version: `5.0.0`,
  },
  {
    variable: `avatar_actionBarIconRed`,
    version: `5.0.0`,
  },
  {
    variable: `chat_inVenueNameText`,
    version: `4.9.0`,
  },
  {
    variable: `chat_outVenueNameText`,
    version: `4.9.0`,
  },
];

export const getRemovedVariables = (variables: string[]): RemovedVariables => {
  return REMOVED_VARIABLES
    .filter(({ variable }) => variables.includes(variable))
    .reduce((object: RemovedVariables, { variable, version }) => {
      object[variable] = version;

      return object;
    }, {});
};

export const defaultValues: DefaultValues = [...defaultTheme.entries()]
  .reduce((object: DefaultValues, [variable, value]) => {
    if (
      OBSOLETE_VARIABLES.includes(variable)
      || UNUSED_VARIABLES.includes(variable)
    ) {
      return object;
    }

    object[variable] = value;

    return object;
  }, {});

export const allVariables = Object.keys(defaultValues);
export const allVariablesAmount = allVariables.length;

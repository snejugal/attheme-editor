import generateDefaultTheme from "attheme-js/lib/defaultThemes/default";
import VARIABLES from "attheme-js/lib/variables";
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
  { variable: `avatar_subtitleInProfilePink`, version: `5.0.0` },
  { variable: `switch2Thumb`, version: `5.0.0` },
  { variable: `avatar_actionBarIconViolet`, version: `5.0.0` },
  { variable: `avatar_subtitleInProfileCyan`, version: `5.0.0` },
  { variable: `avatar_actionBarIconOrange`, version: `5.0.0` },
  { variable: `avatar_backgroundInProfileOrange`, version: `5.0.0` },
  { variable: `switch2ThumbChecked`, version: `5.0.0` },
  { variable: `switchThumbChecked`, version: `5.0.0` },
  { variable: `avatar_actionBarIconPink`, version: `5.0.0` },
  { variable: `avatar_actionBarSelectorCyan`, version: `5.0.0` },
  { variable: `avatar_subtitleInProfileViolet`, version: `5.0.0` },
  { variable: `avatar_actionBarIconCyan`, version: `5.0.0` },
  { variable: `switch2Check`, version: `5.0.0` },
  { variable: `avatar_actionBarSelectorPink`, version: `5.0.0` },
  { variable: `avatar_backgroundInProfilePink`, version: `5.0.0` },
  { variable: `avatar_subtitleInProfileGreen`, version: `5.0.0` },
  { variable: `avatar_backgroundActionBarRed`, version: `5.0.0` },
  { variable: `avatar_backgroundActionBarOrange`, version: `5.0.0` },
  { variable: `avatar_actionBarSelectorOrange`, version: `5.0.0` },
  { variable: `avatar_actionBarIconGreen`, version: `5.0.0` },
  { variable: `avatar_backgroundActionBarCyan`, version: `5.0.0` },
  { variable: `avatar_subtitleInProfileOrange`, version: `5.0.0` },
  { variable: `avatar_actionBarSelectorRed`, version: `5.0.0` },
  { variable: `switchThumb`, version: `5.0.0` },
  { variable: `avatar_backgroundInProfileCyan`, version: `5.0.0` },
  { variable: `avatar_backgroundActionBarViolet`, version: `5.0.0` },
  { variable: `avatar_subtitleInProfileRed`, version: `5.0.0` },
  { variable: `avatar_actionBarSelectorGreen`, version: `5.0.0` },
  { variable: `avatar_backgroundActionBarGreen`, version: `5.0.0` },
  { variable: `avatar_backgroundActionBarPink`, version: `5.0.0` },
  { variable: `avatar_backgroundInProfileRed`, version: `5.0.0` },
  { variable: `avatar_backgroundInProfileViolet`, version: `5.0.0` },
  { variable: `avatar_actionBarSelectorViolet`, version: `5.0.0` },
  { variable: `avatar_backgroundInProfileGreen`, version: `5.0.0` },
  { variable: `avatar_actionBarIconRed`, version: `5.0.0` },
  { variable: `chat_inVenueNameText`, version: `4.9.0` },
  { variable: `chat_outVenueNameText`, version: `4.9.0` },
  { variable: `chat_editDoneIcon`, version: `5.2.x` },
  { variable: `chat_emojiPanelIconSelector`, version: `5.2.x` },
  { variable: `groupcreate_onlineText`, version: `5.2.x` },
  { variable: `groupcreate_offlineText`, version: `5.2.x` },
  { variable: `profile_adminIcon`, version: `5.2.x` },
  { variable: `chat_editDoneIcon`, version: `5.5.x` },
  { variable: `chat_emojiPanelIconSelector`, version: `5.5.x` },
  { variable: `groupcreate_checkbox`, version: `5.7.0` },
  { variable: `groupcreate_checkboxCheck`, version: `5.7.0` },
  { variable: `key_changephoneinfo_changeText`, version: `5.8.0` },
  { variable: `location_markerX`, version: `5.8.0` },
  { variable: `chat_attachCameraIcon1`, version: `5.10.0` },
  { variable: `chat_attachCameraIcon2`, version: `5.10.0` },
  { variable: `chat_attachCameraIcon3`, version: `5.10.0` },
  { variable: `chat_attachCameraIcon4`, version: `5.10.0` },
  { variable: `chat_attachCameraIcon5`, version: `5.10.0` },
  { variable: `chat_attachCameraIcon6`, version: `5.10.0` },
  { variable: `chat_attachGalleryBackgroundPressed`, version: `5.10.0` },
  { variable: `chat_attachVideoBackground`, version: `5.10.0` },
  { variable: `chat_attachVideoBackgroundPressed`, version: `5.10.0` },
  { variable: `chat_attachVideoIcon`, version: `5.10.0` },
  { variable: `chat_attachAudioBackgroundPressed`, version: `5.10.0` },
  { variable: `chat_attachFileBackgroundPressed`, version: `5.10.0` },
  { variable: `chat_attachContactBackgroundPressed`, version: `5.10.0` },
  { variable: `chat_attachLocationBackgroundPressed`, version: `5.10.0` },
  { variable: `chat_attachHideBackground`, version: `5.10.0` },
  { variable: `chat_attachHideBackgroundPressed`, version: `5.10.0` },
  { variable: `chat_attachHideIcon`, version: `5.10.0` },
  { variable: `chat_attachSendBackground`, version: `5.10.0` },
  { variable: `chat_attachSendBackgroundPressed`, version: `5.10.0` },
  { variable: `chat_attachSendIcon`, version: `5.10.0` },
  { variable: `chat_attachPollBackgroundPressed`, version: `5.10.0` },
];

export const getRemovedVariables = (variables: string[]): RemovedVariables => {
  return REMOVED_VARIABLES.filter(({ variable }) =>
    variables.includes(variable),
  ).reduce((object: RemovedVariables, { variable, version }) => {
    object[variable] = version;

    return object;
  }, {});
};

const defaultTheme = generateDefaultTheme();

export const defaultValues: DefaultValues = VARIABLES.reduce(
  (object: DefaultValues, variable) => {
    if (OBSOLETE_VARIABLES.includes(variable)) {
      return object;
    }

    const value = defaultTheme.get(variable) || {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0,
    };

    object[variable] = value;

    return object;
  },
  {},
);

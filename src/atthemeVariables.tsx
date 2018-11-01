import defaultTheme from "attheme-js/lib/defaultThemes/default";
import { Color } from "attheme-js/lib/types";

const OBSOLETE_VARIABLES = [
  `listSelector`,
  `player_seekBarBackground`,
  `player_duration`,
];

const UNUSED_VARIABLES = [
  `chat_mediaBroadcast`,
  `chat_outBroadcast`,
  `windowBackgroundWhiteBlueText2`,
];

const defaultValues = [...defaultTheme.entries()]
  .reduce((object: { [key: string]: Color }, [variable, value]) => {
    if (
      OBSOLETE_VARIABLES.includes(variable)
      || UNUSED_VARIABLES.includes(variable)
    ) {
      return object;
    }

    object[variable] = value;

    return object;
}, {});

const allVariables = Object.keys(defaultValues);
const allVariablesAmount = allVariables.length;

export {
  OBSOLETE_VARIABLES,
  UNUSED_VARIABLES,
  allVariables,
  allVariablesAmount,
  defaultValues,
};

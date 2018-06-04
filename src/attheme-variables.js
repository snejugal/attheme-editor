import allVariablesValues from "attheme-default-values";

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

const defaultValues = {
  ...allVariablesValues,
};

for (const unusedVariable of UNUSED_VARIABLES) {
  delete defaultValues[unusedVariable];
}

const allVariables = Object.keys(defaultValues);
const allVariablesAmount = allVariables.length;

export {
  OBSOLETE_VARIABLES,
  UNUSED_VARIABLES,
  allVariables,
  allVariablesAmount,
  defaultValues,
};
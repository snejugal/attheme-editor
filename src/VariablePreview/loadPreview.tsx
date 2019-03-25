const previewsMap = new Map([
  [`actionBarDefault`, [
    `actionBarDefault`,
    `actionBarDefaultIcon`,
    `actionBarDefaultTitle`,
    `avatar_backgroundRed`,
    `avatar_text`,
    `chats_date`,
    `chats_message`,
    `chats_name`,
    `chats_sentCheck`,
    `windowBackgroundWhite`,
  ]],
  [`actionBarWhiteSelector`, [
    `actionBarWhiteSelector`,
  ]],
  [`chats_unreadCounter`, [
    `avatar_backgroundOrange`,
    `chats_unreadCounter`,
    `chats_unreadCounterText`,
  ]],
  [`chats_secretName`, [
    `avatar_backgroundGreen`,
    `chats_secretIcon`,
    `chats_secretName`,
  ]],
  [`chats_actionMessage`, [
    `avatar_backgroundViolet`,
    `chats_actionMessage`,
    `chats_muteIcon`,
    `chats_unreadCounterMuted`,
  ]],
  [`listSelectorSDK21`, [
    `chats_menuBackground`,
    `chats_menuItemIcon`,
    `chats_menuItemText`,
    `listSelectorSDK21`,
  ]],
  [`chats_menuName`, [
    `chats_menuName`,
    `chats_menuPhone`,
    `chats_menuTopShadow`,
  ]],
  [`chats_pinnedIcon`, [
    `chats_pinnedIcon`,
    `chats_pinnedOverlay`,
  ]],
  [`windowBackgroundWhiteBlueText6`, [
    `divider`,
    `windowBackgroundWhiteBlackText`,
    `windowBackgroundWhiteBlueText6`,
  ]],
  [`player_actionBar`, [
    `player_actionBar`,
    `player_actionBarItems`,
    `player_actionBarTitle`,
    `player_actionBarSubtitle`,
    `player_actionBarTop`,
  ]],
  [`player_background`, [
    `player_button`,
    `player_buttonActive`,
    `player_placeholder`,
    `player_progress`,
    `player_progressBackground`,
    `player_time`,
    `player_background`,
    `player_placeholderBackground`,
  ]],
  [`windowBackgroundWhiteBlueText5`, [
    `windowBackgroundWhiteBlueText5`,
    `windowBackgroundWhiteGrayText2`,
  ]],
]);

const getPreviewName = (variable: string) => {
  for (const [previewName, variables] of previewsMap) {
    if (variables.includes(variable)) {
      return previewName;
    }
  }

  return null;
};

const parser = new DOMParser();

const loadPreview = async (variable: string) => {
  const previewFileName = getPreviewName(variable);

  if (!previewFileName) {
    return null;
  }

  const {
    default: previewUrl,
  } = await import(`./previews/${previewFileName}.svg`);

  const response = await fetch(previewUrl);
  const contents = await response.text();

  const previewDocument = parser.parseFromString(contents, `text/xml`);
  const svg = previewDocument.documentElement;

  return svg;
};

export default loadPreview;

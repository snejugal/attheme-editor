import { PreviewProps } from "./previews/common";

const previewsMap = new Map([
  [`ActionBar`, [
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
  [`ChatsMenu`, [
    `chats_menuName`,
    `chats_menuPhone`,
    `chats_menuTopShadow`,
  ]],
  [`Checkout`, [
    `divider`,
    `windowBackgroundWhiteBlackText`,
    `windowBackgroundWhiteBlueText6`,
  ]],
  [`CreateChannelScreenBottom`, [
    `windowBackgroundWhiteBlueText5`,
    `windowBackgroundWhiteGrayText2`,
  ]],
  [`CreateChannelScreenTop`, [
    `actionBarWhiteSelector`,
  ]],
  [`ListSelector`, [
    `chats_menuBackground`,
    `chats_menuItemIcon`,
    `chats_menuItemText`,
    `listSelectorSDK21`,
  ]],
  [`MutedChat`, [
    `avatar_backgroundViolet`,
    `chats_actionMessage`,
    `chats_muteIcon`,
    `chats_unreadCounterMuted`,
  ]],
  [`PinnedChat`, [
    `chats_pinnedIcon`,
    `chats_pinnedOverlay`,
  ]],
  [`PlayerActionBar`, [
    `player_actionBar`,
    `player_actionBarItems`,
    `player_actionBarTitle`,
    `player_actionBarSubtitle`,
    `player_actionBarTop`,
  ]],
  [`PlayerBackground`, [
    `player_button`,
    `player_buttonActive`,
    `player_placeholder`,
    `player_progress`,
    `player_progressBackground`,
    `player_time`,
    `player_background`,
    `player_placeholderBackground`,
  ]],
  [`SecretChat`, [
    `avatar_backgroundGreen`,
    `chats_secretIcon`,
    `chats_secretName`,
  ]],
  [`UnreadChat`, [
    `avatar_backgroundOrange`,
    `chats_unreadCounter`,
    `chats_unreadCounterText`,
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

const loadPreview = async (variable: string) => {
  const previewFileName = getPreviewName(variable);

  if (!previewFileName) {
    return null;
  }

  interface Import {
    default(props: PreviewProps): JSX.Element;
  }

  const {
    default: Preview,
  }: Import = await import(`./previews/${previewFileName}Preview`);

  return Preview;
};

export default loadPreview;

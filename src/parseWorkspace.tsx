export default (workspace: string) => {
  const { theme, variables, wallpaper, palette, name } = JSON.parse(workspace);

  return {
    variables: variables ? variables : theme,
    wallpaper,
    palette,
    name,
  };
};

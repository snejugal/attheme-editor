import database from "./getDatabase";

const getSetting = <T extends any>(option: string) => (
  new Promise<T>(async (resolve) => {
    const request = (await database)
      .transaction(`settings`)
      .objectStore(`settings`)
      .get(option);

    request.onsuccess = () => resolve(request.result && request.result.value);
  })
);

const setSetting = (option: string, value: any) => (
  new Promise<void>(async (resolve) => {
    const request = (await database)
      .transaction(`settings`, `readwrite`)
      .objectStore(`settings`)
      .put({
        option,
        value,
      });

    request.onsuccess = () => resolve();
  })
);

export const getTabs = async () => (
  // It should've been `workspaces`, but now it's hard to change it smoothly for
  // users.
  await getSetting<number[]>(`workplaces`)
  || []
);

export const getActiveTab = async () => (
  await getSetting<number>(`activeTab`)
  || -1
);

export const createTheme = (theme: Theme) => (
  new Promise<number>(async (resolve) => {
    const request = (await database)
      .transaction(`themes`, `readwrite`)
      .objectStore(`themes`)
      .put(theme);

    request.onsuccess = () => resolve(request.result as number);
  })
);

export const updateWorkspaces = (workspaces: number[]) => (
  // It should've been `workspaces`, but now it's hard to change it smoothly for
  // users.
  setSetting(`workplaces`, workspaces)
);

export const updateActiveTab = (activeTab: number) => (
  setSetting(`activeTab`, activeTab)
);

export const getTheme = (id: number) => new Promise<Theme>(async (resolve) => {
  const request = (await database)
    .transaction(`themes`)
    .objectStore(`themes`)
    .get(id);

  request.onsuccess = () => resolve(request.result);
});

export const updateTheme = (id: number, theme: Theme) => (
  new Promise<void>(async (resolve) => {
    (await database)
      .transaction(`themes`, `readwrite`)
      .objectStore(`themes`)
      .put(theme, id)
      .onsuccess = () => resolve();
  })
);

export const deleteTheme = (id: number) => (
  new Promise<void>(async (resolve) => {
    (await database)
      .transaction(`themes`, `readwrite`)
      .objectStore(`themes`)
      .delete(id)
      .onsuccess = () => resolve();
  })
);

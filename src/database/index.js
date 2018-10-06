import database from "./getDatabase";

const getSetting = (option) => new Promise(async (resolve) => {
  (await database)
    .transaction(`settings`)
    .objectStore(`settings`)
    .get(option)
    .onsuccess = ({ target }) => resolve(target.result && target.result.value);
});

const setSetting = (option, value) => new Promise(async (resolve) => {
  (await database)
    .transaction(`settings`, `readwrite`)
    .objectStore(`settings`)
    .put({
      option,
      value,
    })
    .onsuccess = () => resolve();
});

const getTabs = async () => (await getSetting(`workplaces`) || []);

const getActiveTab = async () => (await getSetting(`activeTab`) || -1);

const createTheme = (theme) => new Promise(async (resolve) => {
  (await database)
    .transaction(`themes`, `readwrite`)
    .objectStore(`themes`)
    .put(theme)
    .onsuccess = ({ target }) => resolve(target.result);
});

const updateWorkplaces = (workplaces) => setSetting(`workplaces`, workplaces);

const updateActiveTab = (activeTab) => setSetting(`activeTab`, activeTab);

const getTheme = (id) => new Promise(async (resolve) => {
  (await database)
    .transaction(`themes`)
    .objectStore(`themes`)
    .get(id)
    .onsuccess = ({ target }) => resolve(target.result);
});

const updateTheme = (id, theme) => new Promise(async (resolve) => {
  (await database)
    .transaction(`themes`, `readwrite`)
    .objectStore(`themes`)
    .put(theme, id)
    .onsuccess = () => resolve();
});

const deleteTheme = (id) => new Promise(async (resolve) => {
  (await database)
    .transaction(`themes`, `readwrite`)
    .objectStore(`themes`)
    .delete(id)
    .onsuccess = () => resolve();
});

export {
  getTabs,
  getActiveTab,
  createTheme,
  updateWorkplaces,
  updateActiveTab,
  getTheme,
  updateTheme,
  deleteTheme,
};

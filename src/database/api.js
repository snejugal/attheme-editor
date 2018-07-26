import getDatabase from "./get-database";

const getSetting = async (option) => {
  const database = await getDatabase();

  const query = database
    .transaction(`settings`)
    .objectStore(`settings`)
    .get(option);

  return new Promise((resolve) => {
    query.onsuccess = () => {
      resolve(query.result && query.result.value);
    };
  });
};

const setSetting = async (option, value) => {
  const database = await getDatabase();

  const query = database
    .transaction(`settings`, `readwrite`)
    .objectStore(`settings`)
    .put({
      option,
      value,
    });

  return new Promise((resolve) => {
    query.onsuccess = () => {
      resolve();
    };
  });
};

const getTabs = async () => {
  const workplaces = await getSetting(`workplaces`);

  return workplaces || [];
};

const getActiveTab = async () => {
  const activeTab = await getSetting(`activeTab`);

  return activeTab || -1;
};

const createTheme = async (theme) => {
  const database = await getDatabase();

  return new Promise((resolve) => {
    const query = database
      .transaction(`themes`, `readwrite`)
      .objectStore(`themes`)
      .put(theme);

    query.onsuccess = () => resolve(query.result);
  });
};

const updateWorkplaces = (workplaces) => setSetting(`workplaces`, workplaces);

const updateActiveTab = (activeTab) => setSetting(`activeTab`, activeTab);

const getTheme = async (id) => {
  const database = await getDatabase();

  return new Promise((resolve) => {
    const query = database
      .transaction(`themes`)
      .objectStore(`themes`)
      .get(id);

    query.onsuccess = () => resolve(query.result);
  });
};

const updateTheme = async (id, theme) => {
  const database = await getDatabase();

  return new Promise((resolve) => {
    const query = database
      .transaction(`themes`, `readwrite`)
      .objectStore(`themes`)
      .put(theme, id);

    query.onsuccess = () => resolve(query.result);
  });
};

const deleteTheme = async (id) => {
  const database = await getDatabase();

  return new Promise((resolve) => {
    const query = database
      .transaction(`themes`, `readwrite`)
      .objectStore(`themes`)
      .delete(id);

    query.onsuccess = () => resolve();
  });
};

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

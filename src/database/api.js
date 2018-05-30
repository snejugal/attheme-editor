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

const getThemesData = async () => {
  const workplaces = await getSetting(`workplaces`);

  return workplaces || [];
};

export {
  getThemesData,
};
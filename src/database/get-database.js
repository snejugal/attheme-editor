import upgrade from "./upgrade";

let database;

const awaiters = [];

const errorHandler = ({ target: { error } }) => {
  throw error;
};

const getDatabase = () => new Promise((resolve) => {
  if (database) {
    resolve(database);
  } else {
    awaiters.push(resolve);
  }
});

const resolveAwaiters = () => {
  for (const awaiter of awaiters) {
    awaiter(database);
  }
};

const request = indexedDB.open(`attheme-editor`, 1);

request.onsuccess = ({ target: { result } }) => {
  database = result;
  database.onerror = errorHandler;

  resolveAwaiters();
};

request.onupgradeneeded = async ({ target: { result } }) => {
  database = result;
  database.onerror = errorHandler;

  await upgrade(database);

  resolveAwaiters();
};

request.onerror = errorHandler;

export default getDatabase;
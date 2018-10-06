import upgrade from "./upgrade";

const errorHandler = ({ target: { error } }) => {
  throw error;
};

export default new Promise((resolve) => {
  const request = indexedDB.open(`attheme-editor`, 1);

  request.onsuccess = ({ target: { result } }) => {
    result.onerror = errorHandler;

    resolve(result);
  };

  request.onupgradeneeded = async ({ target: { result } }) => {
    result.onerror = errorHandler;

    await upgrade(result);
    resolve(result);
  };

  request.onerror = errorHandler;
});

import upgrade from "./upgrade";

const errorHandler = (request: IDBRequest) => {
  throw request.error;
};

export default new Promise<IDBDatabase>((resolve) => {
  const request = indexedDB.open(`attheme-editor`, 1);

  request.onsuccess = () => {
    request.result.onerror = errorHandler.bind(null, request);

    resolve(request.result);
  };

  request.onupgradeneeded = async () => {
    request.result.onerror = errorHandler.bind(null, request);

    await upgrade(request.result);
    resolve(request.result);
  };

  request.onerror = errorHandler.bind(null, request);
});

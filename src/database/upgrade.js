const SCHEME = {
  themes: {
    autoIncrement: true,
  },
  settings: {
    keyPath: `option`,
  },
};

const upgrade = (database) => new Promise((resolve) => {
  const objectStoresAmount = Object.keys(SCHEME).length;

  let completedAmount = 0;

  const resolver = () => {
    completedAmount++;

    if (completedAmount === objectStoresAmount) {
      resolve();
    }
  };

  for (const objectStoreName in SCHEME) {
    const objectStore = database.createObjectStore(
      objectStoreName,
      SCHEME[objectStoreName],
    );

    objectStore.oncomplete = resolver;
  }
});

export default upgrade;
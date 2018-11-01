export default (image: string) => new Promise((resolve, reject) => {
  const imageElement = new Image();

  imageElement.src = `data:image/jpg;base64,${image}`;

  imageElement.addEventListener(`load`, () => resolve({
    width: imageElement.width,
    height: imageElement.height,
  }));

  imageElement.addEventListener(`error`, reject);
});

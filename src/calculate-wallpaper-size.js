const calculateWallpaperSize = (image) => {
  const imageElement = new Image();

  imageElement.src = `data:image/jpg;base64,${image}`;

  document.body.appendChild(imageElement);
  document.body.removeChild(imageElement);

  return {
    width: imageElement.width,
    height: imageElement.height,
  };
};

export default calculateWallpaperSize;

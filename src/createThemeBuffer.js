const createThemeBuffer = (string) => {
  const stringLength = string.length;

  const buffer = new Uint8Array(stringLength);

  for (let i = 0; i < stringLength; i++) {
    buffer[i] = string.charCodeAt(i);
  }

  return buffer;
};

export default createThemeBuffer;

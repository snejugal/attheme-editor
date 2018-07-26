const readFile = (file) => new Promise((resolve) => {
  const reader = new FileReader();

  reader.onload = () => {
    const chars = new Uint8Array(reader.result);
    const { length } = chars;

    let content = ``;

    for (let i = 0; i < length; i++) {
      content += String.fromCharCode(chars[i]);
    }

    resolve(content);
  };

  reader.onerror = () => {
    throw reader.error;
  };

  reader.readAsArrayBuffer(file);
});

export default readFile;

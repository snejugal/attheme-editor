export default (file: File) =>
  new Promise<string>(resolve => {
    const reader = new FileReader();

    reader.onload = () => {
      const chars = new Uint8Array(reader.result as ArrayBuffer);
      const { length } = chars;

      let content = ``;

      for (let charIndex = 0; charIndex < length; charIndex++) {
        content += String.fromCharCode(chars[charIndex]);
      }

      resolve(content);
    };

    reader.onerror = () => {
      throw reader.error;
    };

    reader.readAsArrayBuffer(file);
  });

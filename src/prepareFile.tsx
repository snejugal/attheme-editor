export default (name: string, content: string): string => {
  const { length } = content;
  const buffer = new Uint8Array(length);

  for (let charIndex = 0; charIndex < length; charIndex++) {
    buffer[charIndex] = content.codePointAt(charIndex)!;
  }

  const blob = URL.createObjectURL(new File([buffer], name));

  return blob;
};

export default (blob: string, name: string) => {
  const link = document.createElement(`a`);

  link.href = blob;
  link.download = name;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

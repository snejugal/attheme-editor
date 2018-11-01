import createBuffer from "./createThemeBuffer";

export default ({ content, name }: { content: string, name: string }) => {
  const buffer = createBuffer(content);
  const blob = URL.createObjectURL(new File([buffer], name));

  const link = document.createElement(`a`);

  link.href = blob;
  link.download = name;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

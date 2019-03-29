import { PreviewProps } from "./previews/common";
import previewsMap from "./previewsMap";

const getPreviewName = (variable: string) => {
  for (const [previewName, variables] of previewsMap) {
    if (variables.includes(variable)) {
      return previewName;
    }
  }

  return null;
};

const loadPreview = async (variable: string) => {
  const previewFileName = getPreviewName(variable);

  if (!previewFileName) {
    return null;
  }

  interface Import {
    default(props: PreviewProps): JSX.Element;
  }

  const {
    default: Preview,
  }: Import = await import(`./previews/${previewFileName}Preview`);

  return Preview;
};

export default loadPreview;

interface IDBObjectStore {
  oncomplete(): any;
}

interface PartialColor {
  red: number;
  green: number;
  blue: number;
}

interface Theme {
  variables: {
    [key: string]: Color;
  },
  wallpaper?: string;
  palette: (string | PartialColor)[];
}

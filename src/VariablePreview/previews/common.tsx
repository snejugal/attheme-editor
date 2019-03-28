import { RgbColor, createCssRgb } from "@snejugal/color";
import { useState, useEffect, useMemo } from "react";
import calculateWallpaperSize, { Size } from "../../calculateWallpaperSize";

export interface PreviewProps {
  getColor: GetColor;
  wallpaper?: string;
}

type GetColor = (params: GetColorParams) => RgbColor;

export interface GetColorParams {
  variable: string;
  fallback?: {
    variable: string;
    alpha?: number; // 0..=255
  };
}

export const stringify = (getColor: GetColor) => {
  return (params: GetColorParams) => createCssRgb(getColor(params));
};

interface UseWallpaperProps {
  wallpaper?: string;
  element: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const useWallpaper = ({ wallpaper, element }: UseWallpaperProps) => {
  const [size, setSize] = useState<Size | null>(null);

  useEffect(() => {
    let ignore = false;

    if (wallpaper) {
      calculateWallpaperSize(wallpaper)
        .then((calculatedSize) => {
          if (!ignore) {
            setSize(calculatedSize);
          }
        });
    }

    return () => {
      ignore = true;
    };
  }, [wallpaper]);

  const imageAttributes = useMemo(() => {
    if (!size) {
      return null;
    }

    const elementRatio = element.width / element.height;
    const wallpaperRatio = size.width / size.height;

    let width;
    let height;
    let similarity;

    if (wallpaperRatio > elementRatio) {
      height = 1;
      width = wallpaperRatio;
      similarity = element.height;
    } else {
      width = 1;
      height = 1 / wallpaperRatio;
      similarity = element.width;
    }

    width *= similarity;
    height *= similarity;

    // these are coords of the top left corner when the image is centered
    const x = (element.width - width) / 2 + element.x;
    const y = (element.height - height) / 2 + element.y;

    return {
      width,
      height,
      x,
      y,
      href: `data:image/jpg;base64,${wallpaper}`,
    };
  }, [size]);

  return imageAttributes;
};

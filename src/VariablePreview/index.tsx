import "./styles.scss";

import { createCssRgb } from "@snejugal/color";
import React from "react";
import calculateWallpaperSize from "../calculateWallpaperSize";
import { defaultValues } from "../atthemeVariables";
import previewsMap from "./previewsMap";
import { Color } from "attheme-js/lib/types";

const CHANNEL = 255;

const parser = new DOMParser();

interface Props {
  theme: Theme;
  variable: string;
  currentColor?: Color;
  currentWallpaper?: string;
  shouldShowWallpaper?: boolean;
}

interface State {
  updateeElements: SVGElement[] | null;
}

export default class VariablePreview extends React.Component<Props, State> {
  state: State = {
    updateeElements: null,
  };

  preview = React.createRef<HTMLDivElement>();

  async componentDidMount() {
    const previewFileName = previewsMap[this.props.variable];

    if (!previewFileName) {
      return;
    }

    const idsMap = new Map<string, SVGElement>();

    const previewUrl = await import(`./previews/${previewFileName}.svg`);

    const response = await fetch(previewUrl);
    const contents = await response.text();

    const previewDocument = parser.parseFromString(contents, `text/xml`);
    const svg = previewDocument.documentElement!;

    const coloredElements = [...svg.querySelectorAll<SVGElement>(`[class]`)];

    for (const element of coloredElements) {
      const currentFill = element.getAttribute(`fill`) || ``;

      if (currentFill.startsWith(`url`) && this.props.currentWallpaper) {
        const id = currentFill.slice(`url(#`.length, -`)`.length);

        idsMap.set(id, element);

        continue;
      }

      const variable = element.getAttribute(`class`)!;

      let color = this.props.theme.variables[variable];

      if (!color && element.dataset.fallback) {
        color = (
          this.props.theme.variables[element.dataset.fallback]
          || defaultValues[element.dataset.fallback]
        );

        if (element.dataset.fallbackAlpha) {
          color.alpha = Number(element.dataset.fallbackAlpha) * CHANNEL;
        }
      }

      if (!color) {
        color = defaultValues[variable];
      }

      const cssRgb = createCssRgb(color);

      if (element.tagName === `stop`) {
        element.style.stopColor = cssRgb;
      } else {
        element.style.fill = cssRgb;
      }
    }

    [...svg.querySelectorAll(`:not([href^="data:"]:not([href=""])`)]
      .forEach(async (element) => {
        const url = element.getAttribute(`href`);
        const resolvedUrl = await import(`./previews/${url}`);

        element.setAttribute(`href`, resolvedUrl);
      });

    if (this.props.currentWallpaper) {
      const wallpaperElements = [...svg.querySelectorAll(`[data-wallpaper]`)];

      if (wallpaperElements.length > 0) {
        const wallpaperSize = await calculateWallpaperSize(
          this.props.currentWallpaper,
        );
        const wallpaperRatio = wallpaperSize.width / wallpaperSize.height;

        const image = `data:image;base64,${this.props.currentWallpaper}`;

        for (const imageElement of wallpaperElements) {
          const patternElementId = imageElement.closest(`pattern`)!.id;

          const element = idsMap.get(patternElementId)!;

          // We have to figure out wallpaper element's size on our own
          // because the preview is not rendered yet
          let elementWidth: string | number = element.getAttribute(`width`)!;
          let elementHeight: string | number = element.getAttribute(`height`)!;

          const [svgXOffset, svgYOffset, svgWidth, svgHeight] = svg
            .getAttribute(`viewBox`)!
            .split(` `)
            .map(Number);

          if (elementWidth.endsWith(`%`)) {
            elementWidth = svgWidth;
          } else {
            elementWidth = Number(elementWidth);
          }

          if (elementHeight.endsWith(`%`)) {
            elementHeight = svgHeight;
          } else {
            elementHeight = Number(elementHeight);
          }

          const elementSizeRatio = elementWidth / elementHeight;
          const elementX = Number(element.getAttribute(`x`)) || svgXOffset;
          const elementY = Number(element.getAttribute(`y`)) || svgYOffset;

          let finalWidth;
          let finalHeight;
          let similarity;

          if (wallpaperRatio > elementSizeRatio) {
            finalHeight = 1;
            finalWidth = wallpaperRatio;
            similarity = elementHeight;
          } else {
            finalWidth = 1;
            finalHeight = 1 / wallpaperRatio;
            similarity = elementWidth;
          }

          finalWidth *= similarity;
          finalHeight *= similarity;

          // They don't point to the center, these are coords that will place
          // the image in the center
          const xCenter = elementWidth / 2 + elementX - finalWidth / 2;
          const yCenter = elementHeight / 2 + elementY - finalHeight / 2;

          imageElement.setAttribute(`href`, image);
          imageElement.setAttribute(`width`, String(finalWidth));
          imageElement.setAttribute(`height`, String(finalHeight));
          imageElement.setAttribute(`x`, String(xCenter));
          imageElement.setAttribute(`y`, String(yCenter));
        }
      }
    }

    const updateeElements = [
      ...svg.querySelectorAll<SVGElement>(`[class="${this.props.variable}"]`),
    ];

    this.setState({
      updateeElements,
    });

    this.preview.current!.appendChild(svg);
  }

  componentDidUpdate() {
    if (!this.state.updateeElements) {
      return;
    }

    const cssRgb = createCssRgb(this.props.currentColor!);

    for (const element of this.state.updateeElements) {
      if (element.tagName === `stop`) {
        element.style.stopColor = cssRgb;
      }

      element.style.fill = cssRgb;
    }
  }

  render() {
    return (
      <div className="variablePreview" ref={this.preview}>
        {!this.state.updateeElements
          && this.props.shouldShowWallpaper
          && (
            <img
              className="variablePreview_image"
              src={`data:image/jpg;base64,${this.props.currentWallpaper}`}
              alt=""
            />
          )}
        {!this.state.updateeElements
          && !this.props.shouldShowWallpaper
          && (
            <div
              className="variablePreview_color"
              style={{
                backgroundColor: createCssRgb(this.props.currentColor!),
              }}
            />
          )}
      </div>
    );
  }
}

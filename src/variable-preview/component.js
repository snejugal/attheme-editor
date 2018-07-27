import "./styles.scss";

import Color from "../color";
import PropTypes from "prop-types";
import React from "react";
import calculateWallpaperSize from "../calculate-wallpaper-size";
import { defaultValues } from "../attheme-variables";
import previewsMap from "./previews-map";

const CHANNEL = 255;

const parser = new DOMParser();

class VariablePreview extends React.Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    variable: PropTypes.string.isRequired,
    currentColor: PropTypes.object,
    currentWallpaper: PropTypes.string,
    shouldShowWallpaper: PropTypes.bool,
  };

  state = {
    updateeElements: null,
  };

  preview = React.createRef();

  componentDidMount = async () => {
    const previewFileName = previewsMap[this.props.variable];

    const idsMap = {};

    if (!previewFileName) {
      return;
    }

    const previewUrl = await import(
      `./previews/${previewFileName}.svg`,
    );

    const response = await fetch(previewUrl);
    const contents = await response.text();

    const previewDocument = parser.parseFromString(contents, `text/xml`);
    const svg = previewDocument.documentElement;

    const coloredElements = Array.from(svg.querySelectorAll(`[class]`));

    for (const element of coloredElements) {
      const currentFill = element.getAttribute(`fill`) || ``;

      if (currentFill.startsWith(`url`) && this.props.currentWallpaper) {
        const id = currentFill.slice(`url(#`.length, -`)`.length);

        idsMap[id] = element;

        continue;
      }

      const variable = element.getAttribute(`class`);

      let color = this.props.theme.variables[variable];

      if (!color && `fallback` in element.dataset) {
        color = (
          this.props.theme.variables[element.dataset.fallback]
          || defaultValues[element.dataset.fallback]
        );

        if (`fallbackAlpha` in element.dataset) {
          color.alpha = Number(element.dataset.fallbackAlpha) * CHANNEL;
        }
      }

      if (!color) {
        color = defaultValues[variable];
      }

      const cssRgb = Color.createCssRgb(color);

      if (element.tagName === `stop`) {
        element.style.stopColor = cssRgb;
      } else {
        element.style.fill = cssRgb;
      }
    }

    const linkElements = Array.from(svg.querySelectorAll(`[href]`));

    if (linkElements.length > 0) {
      for (const element of linkElements) {
        const url = element.getAttribute(`href`);

        if (!url.startsWith(`data:`) && url !== ``) {
          const resolvedUrl = await import(`./previews/${url}`);

          element.setAttribute(`href`, resolvedUrl);
        }
      }
    }

    if (this.props.currentWallpaper) {
      const wallpaperElements = Array.from(
        svg.querySelectorAll(`[data-wallpaper]`),
      );

      const wallpaperSize = calculateWallpaperSize(this.props.currentWallpaper);
      const wallpaperRatio = wallpaperSize.width / wallpaperSize.height;

      if (wallpaperElements.length > 0) {
        const image = `data:image;base64,${this.props.currentWallpaper}`;

        for (const imageElement of wallpaperElements) {
          const patternElementId = imageElement.closest(`pattern`).id;

          const element = idsMap[patternElementId];

          // We have to figure out wallpaper element's size on our own
          // because the preview is not rendered yet
          let elementWidth = element.getAttribute(`width`);
          let elementHeight = element.getAttribute(`height`);

          const [svgXOffset, svgYOffset, svgWidth, svgHeight] = svg
            .getAttribute(`viewBox`)
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
          imageElement.setAttribute(`width`, finalWidth);
          imageElement.setAttribute(`height`, finalHeight);
          imageElement.setAttribute(`x`, xCenter);
          imageElement.setAttribute(`y`, yCenter);
        }
      }
    }

    const updateeElements = Array.from(
      svg.querySelectorAll(`[class="${this.props.variable}"]`),
    );

    this.setState({
      updateeElements,
    });

    this.preview.current.appendChild(svg);
  };

  componentDidUpdate = () => {
    if (!this.state.updateeElements) {
      return;
    }

    const cssRgb = Color.createCssRgb(this.props.currentColor);

    for (const element of this.state.updateeElements) {
      if (element.tagName === `stop`) {
        element.style.stopColor = cssRgb;
      }

      element.style.fill = cssRgb;
    }
  };

  render () {
    return (
      <div className="variablePreview" ref={this.preview}>
        {
          !this.state.updateeElements
          && this.props.shouldShowWallpaper
          && (
            <img
              className="variablePreview_image"
              src={`data:image/jpg;base64,${this.props.currentWallpaper}`}
              alt=""
            />
          )
        }
        {
          !this.state.updateeElements
          && !this.props.shouldShowWallpaper
          && (
            <div
              className="variablePreview_color"
              style={{
                backgroundColor: Color.createCssRgb(this.props.currentColor),
              }}
            />
          )
        }
      </div>
    );
  }
}

export default VariablePreview;

import "./styles.scss";

import Color from "../color";
import PropTypes from "prop-types";
import React from "react";
import { defaultValues } from "../attheme-variables";
import previewsMap from "./previews-map";

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
      const variable = element.getAttribute(`class`);

      let color = this.props.theme.variables[variable];

      if (!color) {
        color = defaultValues[variable];
      }

      element.style.fill = Color.createCssRgb(color);
    }

    const linkElements = Array.from(svg.querySelectorAll(`[href]`));

    if (linkElements.length > 0) {
      for (const element of linkElements) {
        const url = element.getAttribute(`href`);

        if (!url.startsWith(`data:`)) {
          const resolvedUrl = await import(`./previews/${url}`);

          element.setAttribute(`href`, resolvedUrl);
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

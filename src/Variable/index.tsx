import "./styles.scss";

import {
  OBSOLETE_VARIABLES,
  UNUSED_VARIABLES,
  allVariables,
} from "../atthemeVariables";
import {
  isLight,
  overlay,
  createCssRgb,
  rgbToHsl,
  createHex,
} from "@snejugal/color";
import Heading from "../Heading";
import React from "react";
import localization from "../localization";
import isEqual from "lodash/isEqual";
import { Color } from "attheme-js/lib/types";

const EDTIOR_BACKGROUND = {
  red: 0x21,
  green: 0x21,
  blue: 0x21,
  alpha: 255,
};
const PERCENTS = 100;

interface Props {
  variableName: string;
  color?: Color;
  wallpaper?: string;
  onClick(variableName: string): void;
  isUnadded?: boolean;
}

export default class Variable extends React.Component<Props> {
  static defaultProps = {
    isUnadded: false,
  };

  shouldComponentUpdate(nextProps: Props) {
    return !isEqual(this.props, nextProps);
  }

  handleClick = () => this.props.onClick(this.props.variableName);

  render() {
    let className = `variable`;

    const style: {
      backgroundColor?: string,
      backgroundImage?: string,
    } = {};

    let content;

    // Telegram respects chat_wallpaper color over image. Doing the same thing.
    if (this.props.color) {
      const { red, green, blue, alpha } = this.props.color;
      const finalColor = overlay(EDTIOR_BACKGROUND, this.props.color);

      style.backgroundColor = createCssRgb(this.props.color);

      if (isLight(finalColor)) {
        className += ` -darkText`;
      }

      const { hue, saturation, lightness } = rgbToHsl(this.props.color);

      const roundedHue = Math.round(hue);
      const roundedSaturation =
        Math.round(saturation * PERCENTS);
      const roundedLightness = Math.round(lightness * PERCENTS);

      content = <>
        <p className="variable_color -hex">
          {createHex(this.props.color)}
        </p>
        <p className="variable_color -rgb">
          {red}, {green}, {blue}, {alpha}
        </p>
        <p className="variable_color -hsl">
          {roundedHue}°, {roundedSaturation}%, {roundedLightness}%, {alpha}
        </p>
      </>;
    } else {
      className += ` -wallpaper`;
      style.backgroundImage =
        `url(data:image/jpg;base64,${this.props.wallpaper})`;
    }

    if (this.props.isUnadded) {
      className += ` -unadded`;
    }

    return (
      <button
        type="button"
        className={className}
        style={style}
        onClick={this.handleClick}
      >
        <div className="variable_badges">
          {this.props.isUnadded && (
            <span className="variable_badge">
              {localization.workspace.unaddedVariable}
            </span>
          )}
          {OBSOLETE_VARIABLES.includes(this.props.variableName) && (
            <span className="variable_badge">
              {localization.workspace.obsoleteVariable}
            </span>
          )}
          {UNUSED_VARIABLES.includes(this.props.variableName) && (
            <span className="variable_badge">
              {localization.workspace.unusedVariable}
            </span>
          )}
          {!allVariables.includes(this.props.variableName)
            && !UNUSED_VARIABLES.includes(this.props.variableName)
            && (
              <span className="variable_badge">
                {localization.workspace.nonStandardVariable}
              </span>
            )}
        </div>
        <Heading level={3} className="variable_title">
          {this.props.variableName}
        </Heading>
        {content}
      </button>
    );
  }
}

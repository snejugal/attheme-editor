import "./styles.scss";

import VARIABLES from "attheme-js/lib/variables";
import { OBSOLETE_VARIABLES, UNUSED_VARIABLES } from "../atthemeVariables";
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
  value: string | Color | Gradient;
  onClick(variableName: string): void;
  isUnadded?: boolean;
  removalVersion?: string;
}

const isColor = (color: string | Color | Gradient): color is Color =>
  typeof color === `object` && `red` in color;

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
      backgroundColor?: string;
      backgroundImage?: string;
    } = {};

    let content;

    // Telegram respects chat_wallpaper color over image. Doing the same thing.
    if (isColor(this.props.value)) {
      const { red, green, blue, alpha } = this.props.value;
      const finalColor = overlay(EDTIOR_BACKGROUND, this.props.value);

      style.backgroundColor = createCssRgb(this.props.value);

      if (isLight(finalColor)) {
        className += ` -darkText`;
      }

      const { hue, saturation, lightness } = rgbToHsl(this.props.value);

      const roundedHue = Math.round(hue);
      const roundedSaturation = Math.round(saturation * PERCENTS);
      const roundedLightness = Math.round(lightness * PERCENTS);

      content = (
        <>
          <p className="variable_color -hex">{createHex(this.props.value)}</p>
          <p className="variable_color -rgb">
            {red}, {green}, {blue}, {alpha}
          </p>
          <p className="variable_color -hsl">
            {roundedHue}°, {roundedSaturation}%, {roundedLightness}%, {alpha}
          </p>
        </>
      );
    } else if (typeof this.props.value === `string`) {
      className += ` -nonPlain`;
      style.backgroundImage = `url(data:image/jpg;base64,${this.props.value})`;
    } else {
      className += ` -nonPlain`;
      style.backgroundImage = `linear-gradient(
        to top right,
        ${createCssRgb(this.props.value.from)},
        ${createCssRgb(this.props.value.to)}
      )`;
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
          {this.props.removalVersion && (
            <span className="variable_badge">
              {localization.workspace.removedVariable(
                this.props.removalVersion,
              )}
            </span>
          )}
          {!this.props.removalVersion &&
            !VARIABLES.includes(this.props.variableName) &&
            !UNUSED_VARIABLES.includes(this.props.variableName) && (
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

import "./styles.scss";

import {
  OBSOLETE_VARIABLES,
  UNUSED_VARIABLES,
  allVariables,
} from "../atthemeVariables";
import Color from "../color";
import Heading from "../Heading/component";
import PropTypes from "prop-types";
import React from "react";
import localization from "../localization";

const DARK_THRESHOLD = 0.6;
const EDTIOR_BACKGROUND = {
  red: 0x21,
  green: 0x21,
  blue: 0x21,
  alpha: 255,
};
const PERCENTS = 100;

class Variable extends React.Component {
  static propTypes = {
    variableName: PropTypes.string.isRequired,
    color: PropTypes.object,
    wallpaper: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    isUnadded: PropTypes.bool,
  };

  static defaultProps = {
    isUnadded: false,
  };

  shouldComponentUpdate = (nextProps) => (
    (nextProps.color && !this.props.color)
    || (nextProps.wallpaper && !this.props.wallpaper)
    || (
      nextProps.color && (
        nextProps.variableName !== this.props.variableName
        || nextProps.color.red !== this.props.color.red
        || nextProps.color.green !== this.props.color.green
        || nextProps.color.blue !== this.props.color.blue
        || nextProps.color.alpha !== this.props.color.alpha
      )
    )
    || nextProps.wallpaper !== this.props.wallpaper
    || nextProps.isUnadded !== this.props.isUnadded
  );

  handleClick = () => this.props.onClick(this.props.variableName);

  render () {
    let className = `variable`;

    const style = {};

    let content;

    // Telegram respects chat_wallpaper color over image. Doing the same thing.
    if (this.props.color) {
      const { red, green, blue, alpha } = this.props.color;
      const finalColor = Color.overlay(EDTIOR_BACKGROUND, this.props.color);
      const brightness = Color.brightness(finalColor);

      style.backgroundColor = Color.createCssRgb(this.props.color);

      if (brightness >= DARK_THRESHOLD) {
        className += ` -darkText`;
      }

      const { hue, saturation, lightness } = Color.rgbToHsl(this.props.color);

      const roundedHue = Math.round(hue);
      const roundedSaturation =
        Math.round(saturation * PERCENTS);
      const roundedLightness = Math.round(lightness * PERCENTS);

      content = <>
        <p className="variable_color -hex">
          {Color.createHex(this.props.color)}
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
          {
            this.props.isUnadded
              ? (
                <span className="variable_badge">
                  {localization.workspace_unaddedVariable()}
                </span>
              )
              : null
          }
          {
            OBSOLETE_VARIABLES.includes(this.props.variableName)
              ? (
                <span className="variable_badge">
                  {localization.workspace_obsoleteVariable()}
                </span>
              )
              : null
          }
          {
            UNUSED_VARIABLES.includes(this.props.variableName)
              ? (
                <span className="variable_badge">
                  {localization.workspace_unusedVariable()}
                </span>
              )
              : null
          }
          {
            (
              allVariables.includes(this.props.variableName)
              || UNUSED_VARIABLES.includes(this.props.variableName)
            )
              ? null
              : (
                <span className="variable_badge">
                  {localization.workspace_nonStandardVariable()}
                </span>
              )
          }
        </div>
        <Heading level={3} className="variable_title">
          {this.props.variableName}
        </Heading>
        {content}
      </button>
    );
  }
}

export default Variable;

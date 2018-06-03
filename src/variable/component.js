import "./styles.scss";

import Color from "../color";
import Heading from "../heading/component";
import PropTypes from "prop-types";
import React from "react";

const DARK_THRESHOLD = 0.6;
const EDTIOR_BACKGROUND = {
  red: 0x21,
  green: 0x21,
  blue: 0x21,
  alpha: 255,
};

class Variable extends React.Component {
  static propTypes = {
    variableName: PropTypes.string.isRequired,
    color: PropTypes.object,
    wallpaper: PropTypes.string,
    onClick: PropTypes.func.isRequired,
  }

  shouldComponentUpdate = (nextProps) => (
    (nextProps.color && !this.props.color) ||
    (nextProps.wallpaper && !this.props.wallpaper) ||
    (nextProps.color && (
      nextProps.variableName !== this.props.variableName ||
      nextProps.color.red !== this.props.color.red ||
      nextProps.color.green !== this.props.color.green ||
      nextProps.color.blue !== this.props.color.blue ||
      nextProps.color.alpha !== this.props.color.alpha
    )) ||
    (nextProps.wallpaper !== this.props.wallpaper)
  )

  handleClick = () => this.props.onClick(this.props.variableName)

  render () {
    let className = `variable`;

    const style = {};

    let content;

    // Telegram respects chat_wallpaper color over image. Doing the same thing.
    if (this.props.color) {
      const { red, green, blue, alpha } = this.props.color;
      const finalColor = Color.overlay(EDTIOR_BACKGROUND, this.props.color);
      const brightness = Color.brightness(finalColor);

      style.backgroundColor = Color.cssRgb(this.props.color);

      if (brightness >= DARK_THRESHOLD) {
        className += ` -darkText`;
      }

      content = <React.Fragment>
        <p className="variable_color -hex">
          {
            Color.hex(this.props.color)
          }
        </p>
        <p className="variable_color -rgb">
          {red} {green} {blue} {alpha}
        </p>
      </React.Fragment>;
    } else {
      className += ` -wallpaper`;
      style.backgroundImage =
        `url(data:image/jpg;base64,${this.props.wallpaper})`;
    }

    return (
      <button
        type="button"
        className={className}
        style={style}
        onClick={this.handleClick}
      >
        <Heading level={3} className="variable_title">
          {this.props.variableName}
        </Heading>
        {content}
      </button>
    );
  }
}

export default Variable;
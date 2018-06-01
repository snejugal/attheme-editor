import "./styles.scss";

import Color from "../color";
import Heading from "../heading/component";
import PropTypes from "prop-types";
import React from "react";

const DARK_THRESHOLD = 0.75;

class Variable extends React.Component {
  static propTypes = {
    variableName: PropTypes.string.isRequired,
    color: PropTypes.object,
    wallpaper: PropTypes.string,
  }

  shouldComponentUpdate = (nextProps) => (
    (`color` in nextProps && !(`color` in this.props)) ||
    (`wallaper` in nextProps && !(`wallaper` in this.props)) ||
    (nextProps.color && (
      nextProps.variableName !== this.props.variableName ||
      nextProps.color.red !== this.props.color.red ||
      nextProps.color.green !== this.props.color.green ||
      nextProps.color.blue !== this.props.color.blue ||
      nextProps.color.alpha !== this.props.color.alpha
    )) ||
    (nextProps.wallpaper !== this.props.wallpaper)
  )

  render () {
    let className = `variable`;

    const style = {};

    let content;

    // Telegram respects chat_wallpaper color over image. Doing the same thing.
    if (this.props.color) {
      const { red, green, blue, alpha } = this.props.color;
      const brightness = Color.brightness({
        red,
        green,
        blue,
      });

      style.backgroundColor = Color.cssRgb({
        red,
        green,
        blue,
        alpha,
      });

      if (brightness >= DARK_THRESHOLD) {
        className += ` -darkText`;
      }

      content = <React.Fragment>
        <p className="variable_color -hex">
          {
            Color.hex({
              red,
              green,
              blue,
              alpha,
            })
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
      <button type="button" className={className} style={style}>
        <Heading level={3} className="variable_title">
          {this.props.variableName}
        </Heading>
        {content}
      </button>
    );
  }
}

export default Variable;
import "./styles.scss";

import Button from "../button/component";
import Color from "../color";
import PropTypes from "prop-types";
import React from "react";

class Palettes extends React.Component {
  static propTypes = {
    themeColors: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
    alpha: PropTypes.number.isRequired,
  };

  render () {
    const palette = this.props.themeColors.map((hex) => ({
      name: hex,
      color: Color.parseHex(hex),
    }));

    return (
      <div className="palettes">
        {
          palette.map(({ name, color }) => {
            const handleClick = () => {
              this.props.onChange({
                ...color,
                alpha: this.props.alpha,
              });
            };

            let className = `palettes_color`;

            if (Color.isLight(color)) {
              className += ` -darkText`;
            }

            return <Button
              className={className}
              backgroundColor={Color.createCssRgb(color)}
              key={name}
              onClick={handleClick}
            >
              {name}
            </Button>;
          })
        }
      </div>
    );
  }
}

export default Palettes;
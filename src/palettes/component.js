import "./styles.scss";

import * as builtInPalettes from "./built-in-palettes";
import Button from "../button/component";
import Color from "../color";
import PropTypes from "prop-types";
import React from "react";
import Select from "../select/component";
import localization from "../localization";

class Palettes extends React.Component {
  static propTypes = {
    themeColors: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
    alpha: PropTypes.number.isRequired,
  };

  state = {
    activePalette: `themeColors`,
  };

  handlePaletteChange = (activePalette) => this.setState({
    activePalette,
  });

  render () {
    let palette;

    if (this.state.activePalette === `themeColors`) {
      palette = this.props.themeColors.map((hex) => ({
        name: hex,
        color: Color.parseHex(hex),
      }));
    } else {
      palette = builtInPalettes[this.state.activePalette];
    }

    const palettes = Object.keys(builtInPalettes)
      .map((id) => ({
        id,
        title: localization[`palettes_${id}`](),
      }));

    palettes.unshift(
      {
        id: `themeColors`,
        title: localization.palettes_themeColors(),
      },
    );

    return (
      <React.Fragment>
        <Select
          items={palettes}
          activeItem={this.state.activePalette}
          onChange={this.handlePaletteChange}
        />
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
      </React.Fragment>
    );
  }
}

export default Palettes;
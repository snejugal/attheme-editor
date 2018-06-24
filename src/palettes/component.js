import "./styles.scss";

import * as builtInPalettes from "./built-in-palettes";
import Button from "../button/component";
import Buttons from "../buttons/component";
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
    themeCustomPalette: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ])
    ).isRequired,
    onCustomPaletteEditStart: PropTypes.func.isRequired,
  };

  constructor (props) {
    super(props);

    this.state = {
      activePalette: (this.props.themeCustomPalette.length > 0)
        ? `themeCustomPalette`
        : `themeColors`,
    };
  }

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
    } else if (this.state.activePalette === `themeCustomPalette`) {
      palette = this.props.themeCustomPalette.map((color) => {
        if (typeof color === `object`) {
          return color;
        }

        return {
          name: color,
          color: Color.parseHex(color),
        };
      });
    } else {
      palette = builtInPalettes[this.state.activePalette];
    }

    const palettes = [
      {
        id: `themeColors`,
        title: localization.palettes_themeColors(),
      },
      {
        id: `themeCustomPalette`,
        title: localization.palettes_themeCustomPalette(),
      },
      ...(
        Object.keys(builtInPalettes)
          .map((id) => ({
            id,
            title: localization[`palettes_${id}`](),
          }))
      ),
    ];

    return (
      <React.Fragment>
        <Select
          items={palettes}
          activeItem={this.state.activePalette}
          onChange={this.handlePaletteChange}
        />
        {
          this.state.activePalette === `themeCustomPalette` && (
            <Buttons>
              <Button onClick={this.props.onCustomPaletteEditStart}>
                {localization.variableEditor_editPalette()}
              </Button>
            </Buttons>
          )
        }
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
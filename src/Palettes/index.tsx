import "./styles.scss";

import * as builtInPalettes from "./builtIn";
import Button from "../Button";
import Buttons from "../Buttons";
import { parseHex, isLight, createCssRgb } from "@snejugal/color";
import Hint from "../Hint";
import React from "react";
import Select from "../Select";
import localization from "../localization";
import { Color } from "attheme-js/lib/types";

/* eslint-disable quotes */
type PaletteName = (
  "themeCustomPalette"
  | "themeColors"
  | "materialDesign"
  | "css"
  | "apple"
  );
/* eslint-enable quotes */

interface Props {
  themeColors: string[];
  onChange(color: Color): void;
  alpha: number;
  themeCustomPalette: Palette;
  onCustomPaletteEditStart(): void;
}

interface State {
  activePalette: PaletteName;
}

export default class Palettes extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activePalette: (this.props.themeCustomPalette.length > 0)
        ? `themeCustomPalette`
        : `themeColors`,
    };
  }

  handlePaletteChange = (activePalette: PaletteName) => this.setState({
    activePalette,
  });

  render() {
    let palette;

    if (this.state.activePalette === `themeColors`) {
      palette = this.props.themeColors.map((hex) => ({
        name: hex,
        color: parseHex(hex)!,
      }));
    } else if (this.state.activePalette === `themeCustomPalette`) {
      palette = this.props.themeCustomPalette.map((color) => {
        if (typeof color === `string`) {
          return {
            name: color,
            color: parseHex(color)!,
          };
        }

        return color;
      });
    } else {
      palette = builtInPalettes[this.state.activePalette];
    }

    const palettes = [
      {
        id: `themeColors`,
        title: localization.palettes.themeColors,
      },
      {
        id: `themeCustomPalette`,
        title: localization.palettes.themeCustomPalette,
      },
      ...(
        (Object.keys(builtInPalettes) as PaletteName[])
          .map((id) => ({
            id,
            title: localization.palettes[id],
          }))
      ),
    ];

    const colors = palette.map((paletteColor, index) => {
      let name;
      let color: PartialColor;

      if (typeof paletteColor === `string`) {
        name = paletteColor;
        color = parseHex(paletteColor)!;
      } else {
        ({ name, color } = paletteColor);
      }

      const handleClick = () => {
        this.props.onChange({
          ...color,
          alpha: this.props.alpha,
        });
      };

      let className = `palettes_color`;

      if (isLight(color)) {
        className += ` -darkText`;
      }

      return <Button
        className={className}
        backgroundColor={createCssRgb(color)}
        key={index}
        onClick={handleClick}
      >
        {name}
      </Button>;
    });

    return <>
      <Select
        items={palettes}
        activeItem={this.state.activePalette}
        onChange={this.handlePaletteChange}
      />
      {this.state.activePalette === `themeCustomPalette` && (
        <Buttons className="variableEditor_buttons">
          <Button onClick={this.props.onCustomPaletteEditStart}>
            {localization.variableEditor.editPalette}
          </Button>
        </Buttons>
      )}
      {colors.length > 0 && (
        <div className="palettes">
          {colors}
        </div>
      )}
      {colors.length === 0
        && this.state.activePalette === `themeColors`
        && (
          <Hint className="palettes_placeholder">
            {localization.variableEditor.themeColorsPlaceholder}
          </Hint>
        )}
      {colors.length === 0
        && this.state.activePalette === `themeCustomPalette`
        && (
          <Hint className="palettes_placeholder">
            {localization.variableEditor.themeCustomPalettePlaceholder}
          </Hint>
        )}
    </>;
  }
}

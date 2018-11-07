import "./styles.scss";

import {
  createHex,
  isLight,
  rgbToHsl,
  createCssRgb,
  parseHex,
} from "@snejugal/color";
import Dialog from "../Dialog";
import Field from "../Field";
import Heading from "../Heading";
import HexInput from "../HexInput";
import Hint from "../Hint";
import HslInput from "../HslInput";
import React from "react";
import RgbInput from "../RgbInput";
import localization from "../localization";

interface Update {
  // eslint-disable-next-line quotes
  channel: "red" | "green" | "blue";
  value: number;
}

interface Props {
  palette: Palette;
  onChange(palette: Palette): void;
  onClose(): void;
  isFromVariableEditor?: boolean;
}

interface State {
  palette: Palette;
  editingColor: EditingColor | null;
}

interface EditingColor {
  index: number;
  name: string;
  value: PartialColor;
}

const PERCENTS = 100;

export default class PaletteEditor extends React.Component<Props, State> {
  static defaultProps = {
    isFromVariableEditor: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      palette: this.props.palette,
      editingColor: null,
    };
  }

  handleCancel = () => this.setState({
    editingColor: null,
  });

  handleSave = () => {
    const palette = [...this.state.palette];

    palette[this.state.editingColor!.index] = {
      name: this.state.editingColor!.name,
      color: this.state.editingColor!.value,
    };

    this.setState({
      palette,
      editingColor: null,
    });

    this.props.onChange(palette);
  };

  handleDelete = () => {
    const palette = [...this.state.palette];

    palette.splice(this.state.editingColor!.index, 1);

    this.setState({
      palette,
      editingColor: null,
    });

    this.props.onChange(palette);
  };

  handleChannelChange = ({ channel, value }: Update) => {
    const editingColorValue = {
      ...this.state.editingColor!.value,
      [channel]: value,
    };

    this.setState({
      editingColor: {
        ...this.state.editingColor!,
        value: editingColorValue,
      },
    });
  };

  handleColorChange = (value: PartialColor) => this.setState({
    editingColor: {
      ...this.state.editingColor!,
      value,
    },
  });

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      editingColor: {
        ...this.state.editingColor!,
        name: event.target.value,
      },
    });
  };

  handleNewColor = () => this.setState({
    editingColor: {
      index: this.state.palette.length,
      name: localization.paletteEditor.defaultColorName,
      value: {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 255,
      },
    },
  });

  render() {
    let title;
    let buttons;
    let colors: React.ReactNode[] = [];

    if (this.state.editingColor) {
      buttons = [
        {
          caption: localization.paletteEditor.save,
          onClick: this.handleSave,
        },
        {
          caption: localization.paletteEditor.cancel,
          onClick: this.handleCancel,
        },
        {
          caption: localization.paletteEditor.delete,
          onClick: this.handleCancel,
          isDangerous: true,
        },
      ];
    } else {
      ({ title } = localization.paletteEditor);
      colors = this.state.palette.map((paletteColor, index) => {
        let name: string;
        let color: PartialColor;

        if (typeof paletteColor === `string`) {
          name = paletteColor;
          color = parseHex(paletteColor)!;
        } else {
          ({ name, color } = paletteColor);
        }

        color.alpha = 255;

        const { hue, saturation, lightness } = rgbToHsl(color);
        const roundedHue = Math.round(hue);
        const roundedSaturation = Math.round(saturation * PERCENTS);
        const roundedLightness = Math.round(lightness * PERCENTS);

        let className = `paletteEditorColor`;

        if (isLight(color)) {
          className += ` -darkText`;
        }

        const handleClick = () => this.setState({
          editingColor: {
            index,
            name,
            value: color,
          },
        });

        return (
          <button
            key={index}
            type="button"
            className={className}
            style={{
              backgroundColor: createCssRgb(color),
            }}
            onClick={handleClick}
          >
            <Heading level={3} className="paletteEditorColor_name">
              {name}
            </Heading>
            <p className="paletteEditorColor_colorModel -hex">
              {createHex(color)}
            </p>
            <p className="paletteEditorColor_colorModel -rgb">
              {color.red}, {color.green}, {color.blue}
            </p>
            <p className="paletteEditorColor_colorModel -hsl">
              {roundedHue}°, {}
              {roundedSaturation}%, {}
              {roundedLightness}%
            </p>
          </button>
        );
      });
      buttons = [
        {
          caption: this.props.isFromVariableEditor
            ? localization.paletteEditor.back
            : localization.paletteEditor.close,
          shouldCloseAfterClick: true,
        },
        {
          caption: localization.paletteEditor.newColor,
          onClick: this.handleNewColor,
        },
      ];
    }

    return (
      <Dialog
        onClose={this.props.onClose}
        buttons={buttons}
        title={title}
      >
        {!this.state.editingColor && colors!.length > 0 && (
          <div className="paletteEditor_colors">
            {colors}
          </div>
        )}
        {!this.state.editingColor && colors!.length === 0 && (
          <Hint className="paletteEditor_colorsPlaceholder">
            {localization.paletteEditor.placeholder}
          </Hint>
        )}
        {this.state.editingColor !== null && <>
          <div
            className="paletteEditor_colorPreview"
            style={{
              backgroundColor: createCssRgb(
                this.state.editingColor.value,
              ),
            }}
          />
          <form noValidate={true}>
            <Field
              value={this.state.editingColor.name}
              onChange={this.handleNameChange}
              id="paletteEditor_name"
            >
              Name
            </Field>
            <HexInput
              color={this.state.editingColor.value}
              onHexChange={this.handleColorChange}
              shouldShowAlpha={false}
            />
            <RgbInput
              color={this.state.editingColor.value}
              onChange={this.handleChannelChange}
            />
            <HslInput
              color={this.state.editingColor.value}
              onChange={this.handleColorChange}
            />
          </form>
        </>}
      </Dialog>
    );
  }
}

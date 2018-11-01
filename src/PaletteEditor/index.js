import "./styles.scss";

import Color from "@snejugal/color";
import Dialog from "../Dialog";
import Field from "../Field";
import Heading from "../Heading";
import HexInput from "../HexInput";
import Hint from "../Hint";
import HslInput from "../HslInput";
import PropTypes from "prop-types";
import React from "react";
import RgbInput from "../RgbInput";
import localization from "../localization";

const PERCENTS = 100;

export default class PaletteEditor extends React.Component {
  static propTypes = {
    palette: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    isFromVariableEditor: PropTypes.bool,
  };

  static defaultProps = {
    isFromVariableEditor: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      palette: this.props.palette,
      editingColorIndex: null,
      editingColorName: null,
      editingColor: null,
      handleHide: null,
    };
  }

  handleCancel = () => this.setState({
    editingColorIndex: null,
    editingColorName: null,
    editingColor: null,
  });

  handleSave = () => {
    const palette = [...this.state.palette];

    palette[this.state.editingColorIndex] = {
      name: this.state.editingColorName,
      color: this.state.editingColor,
    };

    this.setState({
      palette,
      editingColorIndex: null,
      editingColorName: null,
      editingColor: null,
    });

    this.props.onChange(palette);
  };

  handleDelete = () => {
    const palette = [...this.state.palette];

    palette.splice(this.state.editingColorIndex, 1);

    this.setState({
      palette,
      editingColorIndex: null,
      editingColorName: null,
      editingColor: null,
    });

    this.props.onChange(palette);
  };

  handleChannelChange = ({ channel, value }) => {
    const editingColor = {
      ...this.state.editingColor,
      [channel]: value,
    };

    this.setState({
      editingColor,
    });
  };

  handleColorChange = (editingColor) => this.setState({
    editingColor,
  });

  handleNameChange = (event) => this.setState({
    editingColorName: event.target.value,
  });

  handleNewColor = () => this.setState({
    editingColorIndex: this.state.palette.length,
    editingColorName: localization.paletteEditor_defaultColorName(),
    editingColor: {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 255,
    },
  });

  render() {
    let title;
    let buttons;
    let colors;

    if (this.state.editingColorIndex === null) {
      title = localization.paletteEditor_title();
      colors = this.state.palette.map(({ name, color }, index) => {
        color.alpha = 255;

        const { hue, saturation, lightness } = Color.rgbToHsl(color);
        const roundedHue = Math.round(hue);
        const roundedSaturation = Math.round(saturation * PERCENTS);
        const roundedLightness = Math.round(lightness * PERCENTS);

        let className = `paletteEditorColor`;

        if (Color.isLight(color)) {
          className += ` -darkText`;
        }

        const handleClick = () => this.setState({
          editingColorIndex: index,
          editingColorName: name,
          editingColor: color,
        });

        return (
          <button
            key={index}
            type="button"
            className={className}
            style={{
              backgroundColor: Color.createCssRgb(color),
            }}
            onClick={handleClick}
          >
            <Heading level={3} className="paletteEditorColor_name">
              {name}
            </Heading>
            <p className="paletteEditorColor_colorModel -hex">
              {Color.createHex(color)}
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
            ? localization.paletteEditor_back()
            : localization.paletteEditor_close(),
          shouldCloseAfterClick: true,
        },
        {
          caption: localization.paletteEditor_newColor(),
          onClick: this.handleNewColor,
        },
      ];
    } else {
      buttons = [
        {
          caption: localization.paletteEditor_save(),
          onClick: this.handleSave,
        },
        {
          caption: localization.paletteEditor_cancel(),
          onClick: this.handleCancel,
        },
        {
          caption: localization.paletteEditor_delete(),
          onClick: this.handleCancel,
          isDangerous: true,
        },
      ];
    }

    return (
      <Dialog
        onClose={this.props.onClose}
        buttons={buttons}
        title={title}
      >
        {this.state.editingColor === null && colors.length > 0 && (
          <div className="paletteEditor_colors">
            {colors}
          </div>
        )}
        {this.state.editingColor === null && colors.length === 0 && (
          <Hint className="paletteEditor_colorsPlaceholder">
            {localization.paletteEditor_placeholder()}
          </Hint>
        )}
        {this.state.editingColor !== null && <>
          <div
            className="paletteEditor_colorPreview"
            style={{
              backgroundColor: Color.createCssRgb(
                this.state.editingColor,
              ),
            }}
          />
          <form noValidate={true}>
            <Field
              value={this.state.editingColorName}
              onChange={this.handleNameChange}
              id="paletteEditor_name"
            >
              Name
            </Field>
            <HexInput
              color={this.state.editingColor}
              onHexChange={this.handleColorChange}
              shouldShowAlpha={false}
            />
            <RgbInput
              color={this.state.editingColor}
              onChange={this.handleChannelChange}
            />
            <HslInput
              color={this.state.editingColor}
              onChange={this.handleColorChange}
            />
          </form>
        </>}
      </Dialog>
    );
  }
}

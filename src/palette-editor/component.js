import "./styles.scss";

import Button from "../button/component";
import Color from "../color";
import Dialog from "../dialog/component";
import Field from "../field/component";
import Heading from "../heading/component";
import HexInput from "../hex-input/component";
import HslInput from "../hsl-input/component";
import PropTypes from "prop-types";
import React from "react";
import RgbInput from "../rgb-input/component";
import localization from "../localization";

const PERCENTS = 100;

class PaletteEditor extends React.Component {
  static propTypes = {
    palette: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    isFromVariableEditor: PropTypes.bool,
  };

  static defaultProps = {
    isFromVariableEditor: false,
  };

  constructor (props) {
    super(props);

    this.state = {
      palette: this.props.palette,
      editingColorIndex: null,
      editingColorName: null,
      editingColor: null,
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

  render () {
    const title = {};

    let buttons;
    let colors;

    if (this.state.editingColorIndex === null) {
      title.title = localization.paletteEditor_title();
      colors = this.state.palette.map(({ name, color }, i) => {
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
          editingColorIndex: i,
          editingColorName: name,
          editingColor: color,
        });

        return (
          <button
            key={i}
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
      buttons = <React.Fragment>
        <Button onClick={this.props.onClose}>
          {
            this.props.isFromVariableEditor
              ? localization.paletteEditor_back()
              : localization.paletteEditor_close()
          }
        </Button>
        <Button onClick={this.handleNewColor}>
          {localization.paletteEditor_newColor()}
        </Button>
      </React.Fragment>;
    } else {
      buttons = <React.Fragment>
        <Button onClick={this.handleSave}>
          {localization.paletteEditor_save()}
        </Button>
        <Button onClick={this.handleCancel}>
          {localization.paletteEditor_cancel()}
        </Button>
        <Button onClick={this.handleDelete} isDangerous={true}>
          {localization.paletteEditor_delete()}
        </Button>
      </React.Fragment>;
    }

    return (
      <Dialog
        onDismiss={this.props.onClose}
        buttons={buttons}
        {...title}
      >
        {
          this.state.editingColor === null
            ? (
              <div className="paletteEditor_colors">
                {colors}
              </div>
            )
            : (
              <React.Fragment>
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
              </React.Fragment>
            )
        }
      </Dialog>
    );
  }
}

export default PaletteEditor;
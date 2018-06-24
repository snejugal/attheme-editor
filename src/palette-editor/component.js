import "./styles.scss";

import Button from "../button/component";
import Color from "../color";
import Dialog from "../dialog/component";
import Heading from "../heading/component";
import PropTypes from "prop-types";
import React from "react";
import localization from "../localization";

const PERCENTS = 100;

class PaletteEditor extends React.Component {
  static propTypes = {
    palette: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  constructor (props) {
    super(props);

    this.state = {
      palette: this.props.palette,
    };
  }

  render () {
    const colors = this.state.palette.map(({ name, color }, i) => {
      color.alpha = 255;

      const { hue, saturation, lightness } = Color.rgbToHsl(color);
      const roundedHue = Math.round(hue);
      const roundedSaturation = Math.round(saturation * PERCENTS);
      const roundedLightness = Math.round(lightness * PERCENTS);

      let className = `paletteEditorColor`;

      if (Color.isLight(color)) {
        className += ` -darkText`;
      }

      return (
        <button
          key={i}
          type="button"
          className={className}
          style={{
            backgroundColor: Color.createCssRgb(color),
          }}
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

    return (
      <Dialog
        onDismiss={this.props.onClose}
        title={localization.paletteEditor_title()}
        buttons={
          <React.Fragment>
            <Button onClick={this.props.onClose}>
              {localization.paletteEditor_close()}
            </Button>
          </React.Fragment>
        }
      >
        <div className="paletteEditor_colors">
          {colors}
        </div>
      </Dialog>
    );
  }
}

export default PaletteEditor;
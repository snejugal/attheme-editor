import { rgbToHsl, hslToRgb } from "@snejugal/color";
import Field from "../Field";
import Fields from "../Fields";
import React from "react";
import localization from "../localization";

// eslint-disable-next-line quotes
type Channel = "hue" | "saturation" | "lightness";
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface HslColor {
  hue: number;
  saturation: number;
  lightness: number;
}

interface Props {
  color: PartialColor;
  onChange(color: PartialColor): void;
}

interface State {
  hue: number;
  saturation: number;
  lightness: number;
  focusedField: Channel | null;
}

const ROUND = 100;
const PERCENTS = 100;

export default class HslInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { hue, saturation, lightness } = rgbToHsl(props.color);

    const roundedHue = Math.round(hue * ROUND) / ROUND;
    const roundedSaturation = Math.round(saturation * ROUND * PERCENTS) / ROUND;
    const roundedLightness = Math.round(lightness * ROUND * PERCENTS) / ROUND;

    this.state = {
      hue: roundedHue,
      saturation: roundedSaturation,
      lightness: roundedLightness,
      focusedField: null,
    };
  }

  handleChange = (updatedValue: Partial<HslColor>) => {
    let hue = (`hue` in updatedValue)
      ? updatedValue.hue || 0
      : this.state.hue || 0;
    let saturation = (`saturation` in updatedValue)
      ? updatedValue.saturation! / PERCENTS || 0
      : this.state.saturation / PERCENTS || 0;
    let lightness = (`lightness` in updatedValue)
      ? updatedValue.lightness! / PERCENTS || 0
      : this.state.lightness / PERCENTS || 0;

    /* eslint-disable no-magic-numbers */
    if (hue < 0) {
      hue = (360 + (hue % 360)) % 360;
    }

    if (hue >= 360) {
      hue %= 360;
    }

    if (saturation < 0) {
      saturation = 0;
    }

    if (saturation > 1) {
      saturation = 1;
    }

    if (lightness < 0) {
      lightness = 0;
    }

    if (lightness > 1) {
      lightness = 1;
    }
    /* eslint-enable no-magic-numbers */

    const rgbColor = hslToRgb({
      hue,
      saturation,
      lightness,
      alpha: this.props.color.alpha,
    });

    this.props.onChange(rgbColor);

    this.setState({
      hue,
      saturation: Math.round(saturation * PERCENTS * ROUND) / ROUND,
      lightness: Math.round(lightness * PERCENTS * ROUND) / ROUND,
    });
  };

  handleHueChange = (event: ChangeEvent) => this.handleChange({
    hue: event.target.valueAsNumber,
  });

  handleSaturationChange = (event: ChangeEvent) => this.handleChange({
    saturation: event.target.valueAsNumber,
  });

  handleLightnessChange = (event: ChangeEvent) => this.handleChange({
    lightness: event.target.valueAsNumber,
  });

  handleBlur = () => this.setState({
    focusedField: null,
  });

  handleHueFocus = () => this.setState({
    focusedField: `hue`,
  });

  handleSaturationFocus = () => this.setState({
    focusedField: `saturation`,
  });

  handleLightnessFocus = () => this.setState({
    focusedField: `lightness`,
  });

  componentDidUpdate(previousProps: Props) {
    if (previousProps === this.props) {
      return;
    }

    const { hue, saturation, lightness } = rgbToHsl(this.props.color);

    const roundedHue = Math.round(hue * ROUND) / ROUND;
    const roundedSaturation = Math.round(saturation * ROUND * PERCENTS) / ROUND;
    const roundedLightness = Math.round(lightness * ROUND * PERCENTS) / ROUND;

    const updatedState = {
      hue: roundedHue,
      saturation: roundedSaturation,
      lightness: roundedLightness,
    };

    if (this.state.focusedField) {
      delete updatedState[this.state.focusedField];
    }

    this.setState(updatedState);
  }

  render() {
    return (
      <Fields className="variableEditor_fields">
        <Field
          type="number"
          id="variableEditor_hue"
          min={0}
          max={360}
          onChange={this.handleHueChange}
          value={this.state.hue}
          onFocus={this.handleHueFocus}
          onBlur={this.handleBlur}
        >
          {localization.variableEditor_hue()}
        </Field>
        <Field
          type="number"
          id="variableEditor_saturation"
          min={0}
          max={100}
          onChange={this.handleSaturationChange}
          value={this.state.saturation}
          onFocus={this.handleSaturationFocus}
          onBlur={this.handleBlur}
        >
          {localization.variableEditor_saturation()}
        </Field>
        <Field
          type="number"
          id="variableEditor_lightness"
          min={0}
          max={100}
          onChange={this.handleLightnessChange}
          value={this.state.lightness}
          onFocus={this.handleLightnessFocus}
          onBlur={this.handleBlur}
        >
          {localization.variableEditor_lightness()}
        </Field>
      </Fields>
    );
  }
}

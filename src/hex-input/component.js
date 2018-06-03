import Color from "../color";
import Field from "../field/component";
import Fields from "../fields/component";
import PropTypes from "prop-types";
import React from "react";
import localization from "../localization";

class HexInput extends React.Component {
  static propTypes = {
    color: PropTypes.object.isRequired,
    onAlphaChange: PropTypes.func.isRequired,
    onHexChange: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);

    this.state = {
      hex: Color.hex(this.props.color),
    };
  }

  mayChangeHexValue = false

  componentDidUpdate = (previousProps) => {
    if (this.mayChangeHexValue && previousProps !== this.props) {
      this.setState({
        hex: Color.hex(this.props.color),
      });
    }
  }

  handleAlphaChange = (event) => {
    let correctValue = event.target.valueAsNumber;

    if (event.target.valueAsNumber > event.target.max) {
      correctValue = Number(event.target.max);
    }

    if (
      event.target.valueAsNumber < event.target.min
      || Number.isNaN(event.target.valueAsNumber)
    ) {
      correctValue = Number(event.target.min);
    }

    this.props.onAlphaChange({
      channel: `alpha`,
      value: correctValue,
    });
  }

  handleHexChange = (event) => {
    let hex = event.target.value;

    if (!hex.startsWith(`#`)) {
      hex = `#${hex}`;
    }

    const parsedHex = Color.parseHex(hex);

    this.setState({
      hex,
    });

    if (parsedHex !== null) {
      this.props.onHexChange(parsedHex);
    }
  }

  handleHexBlur = () => {
    this.mayChangeHexValue = true;
  }

  handleHexFocus = () => {
    this.mayChangeHexValue = false;
  }

  render () {
    return (
      <Fields className="variableEditor_fields">
        <Field
          id="variableEditor_hex"
          onChange={this.handleHexChange}
          value={this.state.hex}
          className="variableEditor_hexField"
          inputRef={this.hexInput}
          onFocus={this.handleHexFocus}
          onBlur={this.handleHexBlur}
          autoFocus={true}
        >
          {localization.variableEditor_hex()}
        </Field>
        <Field
          type="number"
          id="variableEditor_alpha"
          min={0}
          max={255}
          onChange={this.handleAlphaChange}
          value={this.props.color.alpha}
        >
          {localization.variableEditor_alpha()}
        </Field>
      </Fields>
    );
  }
}

export default HexInput;
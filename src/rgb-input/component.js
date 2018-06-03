import Field from "../field/component";
import Fields from "../fields/component";
import PropTypes from "prop-types";
import React from "react";
import localization from "../localization";

class RgbInput extends React.Component {
  static propTypes = {
    color: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  handleChange = (channel, event) => {
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

    this.props.onChange({
      channel,
      value: correctValue,
    });
  }

  handleRedChange = (event) => this.handleChange(`red`, event)

  handleGreenChange = (event) => this.handleChange(`green`, event)

  handleBlueChange = (event) => this.handleChange(`blue`, event)

  render () {
    return (
      <Fields className="variableEditor_fields">
        <Field
          type="number"
          id="variableEditor_red"
          min={0}
          max={255}
          onChange={this.handleRedChange}
          value={this.props.color.red}
        >
          {localization.variableEditor_red()}
        </Field>
        <Field
          type="number"
          id="variableEditor_green"
          min={0}
          max={255}
          onChange={this.handleGreenChange}
          value={this.props.color.green}
        >
          {localization.variableEditor_green()}
        </Field>
        <Field
          type="number"
          id="variableEditor_blue"
          min={0}
          max={255}
          onChange={this.handleBlueChange}
          value={this.props.color.blue}
        >
          {localization.variableEditor_blue()}
        </Field>
      </Fields>
    );
  }
}

export default RgbInput;
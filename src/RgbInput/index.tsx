import Field from "../Field";
import Fields from "../Fields";
import PropTypes from "prop-types";
import React from "react";
import localization from "../localization";
import { Color } from "attheme-js/lib/types";

// eslint-disable-next-line quotes
type Channel = "red" | "green" | "blue";
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface Props {
  color: Color;
  onChange(change: { channel: Channel, value: number }): void;
}

export default class RgbInput extends React.Component<Props> {
  static propTypes = {
    color: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleChange = (channel: Channel, event: ChangeEvent) => {
    let correctValue = event.currentTarget.valueAsNumber;

    if (
      Number.isNaN(event.currentTarget.valueAsNumber)
      || event.currentTarget.valueAsNumber < +event.currentTarget.min
    ) {
      correctValue = Number(event.currentTarget.min);
    }

    if (event.currentTarget.valueAsNumber > +event.currentTarget.max) {
      correctValue = Number(event.currentTarget.max);
    }

    correctValue = Math.round(correctValue);

    this.props.onChange({
      channel,
      value: correctValue,
    });
  };

  handleRedChange = (event: ChangeEvent) => this.handleChange(`red`, event);

  handleGreenChange = (event: ChangeEvent) => this.handleChange(`green`, event);

  handleBlueChange = (event: ChangeEvent) => this.handleChange(`blue`, event);

  render() {
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

import Field from "../Field";
import Fields from "../Fields";
import React from "react";
import localization from "../localization";

type Channel = "red" | "green" | "blue";
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface Props {
  color: PartialColor;
  onChange(change: { channel: Channel; value: number }): void;
}

export default class RgbInput extends React.Component<Props> {
  handleChange = (channel: Channel, event: ChangeEvent) => {
    let correctValue = event.currentTarget.valueAsNumber;

    if (
      Number.isNaN(event.currentTarget.valueAsNumber) ||
      event.currentTarget.valueAsNumber < Number(event.currentTarget.min)
    ) {
      correctValue = Number(event.currentTarget.min);
    }

    if (event.currentTarget.valueAsNumber > Number(event.currentTarget.max)) {
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
          {localization.variableEditor.red}
        </Field>
        <Field
          type="number"
          id="variableEditor_green"
          min={0}
          max={255}
          onChange={this.handleGreenChange}
          value={this.props.color.green}
        >
          {localization.variableEditor.green}
        </Field>
        <Field
          type="number"
          id="variableEditor_blue"
          min={0}
          max={255}
          onChange={this.handleBlueChange}
          value={this.props.color.blue}
        >
          {localization.variableEditor.blue}
        </Field>
      </Fields>
    );
  }
}

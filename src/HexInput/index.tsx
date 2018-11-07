import { parseHex, createHex } from "@snejugal/color";
import Field from "../Field";
import Fields from "../Fields";
import React from "react";
import localization from "../localization";

// eslint-disable-next-line quotes
type Channel = "red" | "green" | "blue" | "alpha";

interface Props {
  color: PartialColor;
  onAlphaChange?(data: { channel: Channel, value: number }): void;
  onHexChange(color: PartialColor): void;
  shouldShowAlpha?: boolean;
}

interface State {
  hex: string;
}

export default class HexInput extends React.Component<Props, State> {
  static defaultProps = {
    shouldShowAlpha: true,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      hex: createHex(this.props.color),
    };
  }

  mayChangeHexValue = false;

  componentDidUpdate(previousProps: Props) {
    if (this.mayChangeHexValue && previousProps !== this.props) {
      this.setState({
        hex: createHex(this.props.color),
      });
    }
  }

  handleAlphaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let correctValue = event.target.valueAsNumber;

    if (
      Number.isNaN(event.target.valueAsNumber)
      || event.target.valueAsNumber < +event.target.min
    ) {
      correctValue = Number(event.target.min);
    }

    if (event.target.valueAsNumber > +event.target.max) {
      correctValue = Number(event.target.max);
    }


    correctValue = Math.round(correctValue);

    this.props.onAlphaChange!({
      channel: `alpha`,
      value: correctValue,
    });
  };

  handleHexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let hex = event.target.value;

    if (!hex.startsWith(`#`)) {
      hex = `#${hex}`;
    }

    const parsedHex = parseHex(hex);

    this.setState({
      hex,
    });

    if (parsedHex !== null) {
      if (!this.props.shouldShowAlpha) {
        parsedHex.alpha = this.props.color.alpha!;
      }

      this.props.onHexChange(parsedHex);
    }
  };

  handleHexBlur = () => {
    this.mayChangeHexValue = true;
  };

  handleHexFocus = () => {
    this.mayChangeHexValue = false;
  };

  render() {
    return (
      <Fields className="variableEditor_fields">
        <Field
          id="variableEditor_hex"
          onChange={this.handleHexChange}
          value={this.state.hex}
          className="variableEditor_hexField"
          onFocus={this.handleHexFocus}
          onBlur={this.handleHexBlur}
          autoFocus={true}
        >
          {localization.variableEditor.hex}
        </Field>
        {this.props.shouldShowAlpha && (
          <Field
            type="number"
            id="variableEditor_alpha"
            min={0}
            max={255}
            onChange={this.handleAlphaChange}
            value={this.props.color.alpha!}
          >
            {localization.variableEditor.alpha}
          </Field>
        )}
      </Fields>
    );
  }
}

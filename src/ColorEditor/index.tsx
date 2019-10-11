import RgbInput from "../RgbInput";
import HslInput from "../HslInput";
import HexInput from "../HexInput";
import { Color } from "attheme-js/lib/types";
import React from "react";

interface Props {
  color: Color;
  onChange(color: Color): void;
}

type Channel = `red` | `green` | `blue`;
interface Update {
  channel: Channel;
  value: number;
}

const ColorEditor = ({ color, onChange }: Props) => {
  const handleRgbaChannelChange = ({ channel, value }: Update) =>
    onChange({
      ...color,
      [channel]: value,
    });
  const handleColorChange = (newColor: PartialColor) =>
    onChange({
      ...color,
      ...newColor,
    });

  return (
    <form noValidate={true}>
      <HexInput
        color={color}
        onAlphaChange={handleRgbaChannelChange}
        onHexChange={handleColorChange}
      />
      <RgbInput color={color} onChange={handleRgbaChannelChange} />
      <HslInput color={color} onChange={handleColorChange} />
    </form>
  );
};

export default ColorEditor;

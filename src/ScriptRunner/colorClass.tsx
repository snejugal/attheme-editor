/* eslint-disable max-len */

import {
  brightness,
  hslToRgb,
  rgbToHsl,
  overlay,
  createHex,
  parseHex,
} from "@snejugal/color";
import { Color } from "attheme-js/lib/types";

interface HslColor {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
}

const RGBA_CHANNELS = [`red`, `green`, `blue`, `alpha`];
const HSLA_CHANNELS = [`hue`, `saturation`, `lightness`, `alpha`];
const MIN_RGBA_CHANNEL_VALUE = 0;
const MAX_RGBA_CHANNEL_VALUE = 255;
const MIN_HUE_VALUE = 0;
const MAX_HUE_VALUE_EXCLUDING = 360;
const MIN_SATURATION_LIGHTNESS_VALUE = 0;
const MAX_SATURATION_LIGHTNESS_VALUE = 1;

// In checkers and fixers you might see a lot of `// @ts-ignore`. This is
// because the arguments are coming from running scripts which may pass invalid
// arguments, leading to the theme being invalid.

export const checkRgbColorValidity = (rgbColor: unknown) => {
  if (typeof rgbColor !== `object` || rgbColor === null) {
    throw new TypeError(
      `Expected the passed color to be an object, received ${typeof rgbColor}`,
    );
  }

  for (const channel in rgbColor) {
    if (!RGBA_CHANNELS.includes(channel)) {
      throw new TypeError(
        `Unknown "${channel}" channel in the passed RGB color`,
      );
    }
  }

  for (const channel of RGBA_CHANNELS) {
    if (!(channel in rgbColor)) {
      throw new TypeError(
        `The ${channel} channel was not specified in the passed RGB color`,
      );
    }

    // @ts-ignore
    // I really wonder why TypeScript throws an error saying that
    // `rgbColor[channel]` implicitly has an `any` type.
    const channelValue: any = rgbColor[channel];

    if (typeof channelValue !== `number`) {
      throw new TypeError(
        `The ${channel} channel is not a number (received ${typeof channelValue})`,
      );
    }

    if (
      channelValue > MAX_RGBA_CHANNEL_VALUE ||
      channelValue < MIN_RGBA_CHANNEL_VALUE ||
      channelValue % 1 !== 0
    ) {
      throw new TypeError(
        `The ${channel} channel is out of the range [0, 255] (received ${channelValue})`,
      );
    }
  }
};

const checkHslColorValidity = (hslColor: unknown) => {
  if (typeof hslColor !== `object` || hslColor === null) {
    throw new TypeError(
      `Expected the passed color to be an object, received ${typeof hslColor}`,
    );
  }

  for (const channel in hslColor) {
    if (!HSLA_CHANNELS.includes(channel)) {
      throw new TypeError(
        `Unknown "${channel}" channel in the passed RGB color`,
      );
    }
  }

  for (const channel of HSLA_CHANNELS) {
    if (!(channel in hslColor)) {
      throw new TypeError(
        `The ${channel} channel was not specified in the passed HSL color`,
      );
    }

    // @ts-ignore
    const channelValue: any = hslColor[channelValue];

    if (typeof channelValue !== `number`) {
      throw new TypeError(
        `The ${channelValue} channel is not a number (received ${typeof channelValue})`,
      );
    }
  }

  // @ts-ignore
  // It was checked above that `hslColor` only has these properties
  const { hue, saturation, lightness, alpha }: HslColor = hslColor;

  if (MAX_HUE_VALUE_EXCLUDING <= hue || hue < MIN_HUE_VALUE) {
    throw new TypeError(
      `The hue channel is out of the range [0.0, 360.0) (received ${hue})`,
    );
  }

  if (
    MAX_RGBA_CHANNEL_VALUE < alpha ||
    alpha < MIN_RGBA_CHANNEL_VALUE ||
    alpha % 1 !== 0
  ) {
    throw new TypeError(
      `The alpha channel is out of the range [0, 255] (received ${alpha})`,
    );
  }

  for (const channel of [`saturation`, `lightness`]) {
    // @ts-ignore
    const channelValue: number = hslColor[channel];

    if (
      channelValue > MAX_SATURATION_LIGHTNESS_VALUE ||
      channelValue < MIN_SATURATION_LIGHTNESS_VALUE
    ) {
      throw new TypeError(
        `The ${channel} channel is out of the range [0.0, 1.0] (received ${channelValue})`,
      );
    }
  }
};

const normalizeRgbColor = (rgbColor: unknown, ...excess: unknown[]) => {
  if (excess.length > 0) {
    throw new TypeError(
      `Color.normalizeRgbColor expected 1 argument, received ${excess.length +
        1}`,
    );
  }

  if (typeof rgbColor !== `object`) {
    throw new TypeError(
      `Expected the passed color to be an object, received ${typeof rgbColor}`,
    );
  }

  const fixedColor: Partial<Color> = {
    ...rgbColor,
  };

  for (const channel in fixedColor) {
    if (!RGBA_CHANNELS.includes(channel)) {
      // @ts-ignore
      delete fixedColor[channel];
    }
  }

  for (const channel of RGBA_CHANNELS) {
    if (!(channel in fixedColor)) {
      if (channel === `alpha`) {
        fixedColor.alpha = 255;
      } else {
        throw new TypeError(
          `The ${channel} channel was not specified in the passed RGB color`,
        );
      }
    }

    // @ts-ignore
    const channelValue: any = fixedColor[channel];

    if (typeof channel !== `number`) {
      try {
        // @ts-ignore
        fixedColor[channel] = Number(channelValue);
      } catch {
        // @ts-ignore
        throw new TypeError(`Could not convert ${channelValue} to a number`);
      }
    }

    if (Number.isNaN(channelValue)) {
      // @ts-ignore
      fixedColor[channel] = MIN_RGBA_CHANNEL_VALUE;
    }

    // @ts-ignore
    if (fixedColor[channel] > MAX_RGBA_CHANNEL_VALUE) {
      // @ts-ignore
      fixedColor[channel] = MAX_RGBA_CHANNEL_VALUE;
    }

    // @ts-ignore
    if (fixedColor[channel] < MIN_RGBA_CHANNEL_VALUE) {
      // @ts-ignore
      fixedColor[channel] = MIN_RGBA_CHANNEL_VALUE;
    }

    // @ts-ignore
    if (fixedColor[channel] % 1 !== 0) {
      // @ts-ignore
      fixedColor[channel] = Math.round(channelValue);
    }
  }

  return fixedColor;
};

const normalizeHslColor = (hslColor: unknown, ...excess: unknown[]) => {
  if (excess.length > 0) {
    throw new TypeError(
      `Color.normalizeHslColor expected 1 argument, received ${excess.length +
        1}`,
    );
  }

  if (typeof hslColor !== `object`) {
    throw new TypeError(
      `Expected the passed color to be an object, received ${typeof hslColor}`,
    );
  }

  const fixedColor: Partial<HslColor> = {
    ...hslColor,
  };

  for (const channel in fixedColor) {
    if (!HSLA_CHANNELS.includes(channel)) {
      // @ts-ignore
      delete fixedColor[channel];
    }
  }

  for (const channel of HSLA_CHANNELS) {
    if (!(channel in fixedColor)) {
      if (channel === `alpha`) {
        fixedColor.alpha = 255;
      } else {
        throw new TypeError(
          `The ${channel} channel was not specified in the passed HSL color`,
        );
      }
    }

    // @ts-ignore
    const channelValue: any = fixedColor[channel];

    if (typeof channelValue !== `number`) {
      try {
        // @ts-ignore
        fixedColor[channel] = Number(channelValue);
      } catch {
        throw new TypeError(`Could not convert ${channelValue} to a number`);
      }
    }
  }

  if (Number.isNaN(fixedColor.alpha!)) {
    fixedColor.alpha = MIN_RGBA_CHANNEL_VALUE;
  }

  if (fixedColor.alpha! > MAX_RGBA_CHANNEL_VALUE) {
    fixedColor.alpha = MAX_RGBA_CHANNEL_VALUE;
  }

  if (fixedColor.alpha! < MIN_RGBA_CHANNEL_VALUE) {
    fixedColor.alpha = MIN_RGBA_CHANNEL_VALUE;
  }

  if (fixedColor.alpha! % 1 !== 0) {
    fixedColor.alpha = Math.round(fixedColor.alpha!);
  }

  if (Number.isNaN(fixedColor.hue!)) {
    fixedColor.hue = MIN_HUE_VALUE;
  }

  fixedColor.hue =
    (MAX_HUE_VALUE_EXCLUDING + (fixedColor.hue! % MAX_HUE_VALUE_EXCLUDING)) %
    MAX_HUE_VALUE_EXCLUDING;

  for (const channel of [`saturation`, `lightness`]) {
    // @ts-ignore
    const channelValue = fixedColor[channel];

    if (Number.isNaN(channelValue)) {
      // @ts-ignore
      fixedColor[channel] = MIN_SATURATION_LIGHTNESS_VALUE;
    }

    if (channelValue > MAX_SATURATION_LIGHTNESS_VALUE) {
      // @ts-ignore
      fixedColor[channel] = MAX_SATURATION_LIGHTNESS_VALUE;
    }

    if (channelValue < MIN_SATURATION_LIGHTNESS_VALUE) {
      // @ts-ignore
      fixedColor[channel] = MIN_SATURATION_LIGHTNESS_VALUE;
    }
  }

  return fixedColor;
};

export default {
  normalizeRgbColor,
  normalizeHslColor,
  brightness(color: Color, ...excess: unknown[]) {
    if (excess.length > 0) {
      throw new TypeError(
        `Color.brightness expected 1 argument, received ${excess.length + 1}`,
      );
    }

    checkRgbColorValidity(color);

    return brightness(color);
  },
  parseHex(hex: string, ...excess: unknown[]) {
    if (excess.length > 0) {
      throw new TypeError(
        `Color.parseHex expected 1 argument, received ${excess.length + 1}`,
      );
    }

    if (typeof hex !== `string`) {
      throw new TypeError(
        `Expected the passed hex to be a string, received ${typeof hex}`,
      );
    }

    return parseHex(hex);
  },
  createHex(color: Color, ...excess: unknown[]) {
    if (excess.length > 0) {
      throw new TypeError(
        `Color.createHex expected 1 argument, received ${excess.length + 1}`,
      );
    }

    checkRgbColorValidity(color);

    return createHex(color);
  },
  rgbToHsl(color: Color, ...excess: unknown[]) {
    if (excess.length > 0) {
      throw new TypeError(
        `Color.rgbToHsl expected 1 argument, received ${excess.length + 1}`,
      );
    }

    checkRgbColorValidity(color);

    return rgbToHsl(color);
  },
  hslToRgb(color: HslColor, ...excess: unknown[]) {
    if (excess.length > 0) {
      throw new TypeError(
        `Color.hslToRgb expected 1 argument, received ${excess.length + 1}`,
      );
    }

    checkHslColorValidity(color);

    return hslToRgb(color);
  },
  overlay(...colors: Color[]) {
    for (const color of colors) {
      checkRgbColorValidity(color);
    }

    return overlay(...colors);
  },
};

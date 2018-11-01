/* eslint-disable max-len */

import Color from "@snejugal/color";

const RGBA_CHANNELS = [`red`, `green`, `blue`, `alpha`];
const HSLA_CHANNELS = [`hue`, `saturation`, `lightness`, `alpha`];
const MIN_RGBA_CHANNEL_VALUE = 0;
const MAX_RGBA_CHANNEL_VALUE = 255;
const MIN_HUE_VALUE = 0;
const MAX_HUE_VALUE_EXCLUDING = 360;
const MIN_SATURATION_LIGHTNESS_VALUE = 0;
const MAX_SATURATION_LIGHTNESS_VALUE = 1;

const checkRgbColorValidity = (rgbColor) => {
  if (typeof rgbColor !== `object`) {
    throw new TypeError(`Expected the passed color to be an object, received ${typeof rgbColor}`);
  }

  for (const channel in rgbColor) {
    if (!RGBA_CHANNELS.includes(channel)) {
      throw new TypeError(`Unknown "${channel}" channel in the passed RGB color`);
    }
  }

  RGBA_CHANNELS.forEach((channel) => {
    if (!(channel in rgbColor)) {
      throw new TypeError(`The ${channel} channel was not specified in the passed RGB color`);
    }

    if (typeof rgbColor[channel] !== `number`) {
      throw new TypeError(`The ${channel} channel is not a number (received ${typeof rgbColor[channel]})`);
    }

    if (
      rgbColor[channel] > MAX_RGBA_CHANNEL_VALUE
      || rgbColor[channel] < MIN_RGBA_CHANNEL_VALUE
      || rgbColor[channel] % 1 !== 0
    ) {
      throw new TypeError(`The ${channel} channel is out of the range [0, 255] (received ${rgbColor[channel]})`);
    }
  });
};

const checkHslColorValidity = (hslColor) => {
  if (typeof hslColor !== `object`) {
    throw new TypeError(`Expected the passed color to be an object, received ${typeof hslColor}`);
  }

  for (const channel in hslColor) {
    if (!HSLA_CHANNELS.includes(channel)) {
      throw new TypeError(`Unknown "${channel}" channel in the passed RGB color`);
    }
  }

  HSLA_CHANNELS.forEach((channel) => {
    if (!(channel in hslColor)) {
      throw new TypeError(`The ${channel} channel was not specified in the passed HSL color`);
    }

    if (typeof hslColor[channel] !== `number`) {
      throw new TypeError(`The ${channel} channel is not a number (received ${typeof hslColor[channel]})`);
    }
  });

  if (
    hslColor.hue >= MAX_HUE_VALUE_EXCLUDING
    || hslColor.hue < MIN_HUE_VALUE
  ) {
    throw new TypeError(`The hue channel is out of the range [0.0, 360.0) (received ${hslColor.hue})`);
  }

  if (
    hslColor.alpha > MAX_RGBA_CHANNEL_VALUE
    || hslColor.alpha < MIN_RGBA_CHANNEL_VALUE
    || hslColor.alpha % 1 !== 0
  ) {
    throw new TypeError(`The alpha channel is out of the range [0, 255] (received ${hslColor.alpha})`);
  }

  for (const channel of [`saturation`, `lightness`]) {
    if (
      hslColor[channel] > MAX_SATURATION_LIGHTNESS_VALUE
      || hslColor[channel] < MIN_SATURATION_LIGHTNESS_VALUE
    ) {
      throw new TypeError(`The ${channel} channel is out of the range [0.0, 1.0] (received ${hslColor[channel]})`);
    }
  }
};

const normalizeRgbColor = (rgbColor, ...excessiveArguments) => {
  if (excessiveArguments.length > 0) {
    throw new TypeError(`Color.normalizeRgbColor expected 1 argument, received ${excessiveArguments.length + 1}`);
  }

  if (typeof rgbColor !== `object`) {
    throw new TypeError(`Expected the passed color to be an object, received ${typeof rgbColor}`);
  }

  const fixedColor = {
    ...rgbColor,
  };

  for (const channel in fixedColor) {
    if (!RGBA_CHANNELS.includes(channel)) {
      delete fixedColor[channel];
    }
  }

  for (const channel of RGBA_CHANNELS) {
    if (!(channel in fixedColor)) {
      if (channel === `alpha`) {
        fixedColor.alpha = 255;
      } else {
        throw new TypeError(`The ${channel} channel was not specified in the passed RGB color`);
      }
    }

    if (typeof fixedColor[channel] !== `number`) {
      try {
        fixedColor[channel] = Number(fixedColor[channel]);
      } catch {
        try {
          fixedColor[channel] = parseInt(String(fixedColor[channel]));
        } catch {
          throw new TypeError(`Could not convert ${fixedColor[channel]} to a number`);
        }
      }
    }

    if (Number.isNaN(fixedColor[channel])) {
      fixedColor[channel] = MIN_RGBA_CHANNEL_VALUE;
    }

    if (fixedColor[channel] > MAX_RGBA_CHANNEL_VALUE) {
      fixedColor[channel] = MAX_RGBA_CHANNEL_VALUE;
    }

    if (fixedColor[channel] < MIN_RGBA_CHANNEL_VALUE) {
      fixedColor[channel] = MIN_RGBA_CHANNEL_VALUE;
    }

    if (fixedColor[channel] % 1 !== 0) {
      fixedColor[channel] = Math.round(fixedColor[channel]);
    }
  }

  return fixedColor;
};

const normalizeHslColor = (hslColor, ...excessiveArguments) => {
  if (excessiveArguments.length > 0) {
    throw new TypeError(`Color.normalizeHslColor expected 1 argument, received ${excessiveArguments.length + 1}`);
  }

  if (typeof hslColor !== `object`) {
    throw new TypeError(`Expected the passed color to be an object, received ${typeof hslColor}`);
  }

  const fixedColor = {
    ...hslColor,
  };

  for (const channel in fixedColor) {
    if (!HSLA_CHANNELS.includes(channel)) {
      delete fixedColor[channel];
    }
  }

  for (const channel of HSLA_CHANNELS) {
    if (!(channel in fixedColor)) {
      if (channel === `alpha`) {
        fixedColor.alpha = 255;
      } else {
        throw new TypeError(`The ${channel} channel was not specified in the passed HSL color`);
      }
    }

    if (typeof fixedColor[channel] !== `number`) {
      try {
        fixedColor[channel] = Number(fixedColor[channel]);
      } catch {
        throw new TypeError(`Could not convert ${fixedColor[channel]} to a number`);
      }
    }
  }

  if (Number.isNaN(fixedColor.alpha)) {
    fixedColor.alpha = MIN_RGBA_CHANNEL_VALUE;
  }

  if (fixedColor.alpha > MAX_RGBA_CHANNEL_VALUE) {
    fixedColor.alpha = MAX_RGBA_CHANNEL_VALUE;
  }

  if (fixedColor.alpha < MIN_RGBA_CHANNEL_VALUE) {
    fixedColor.alpha = MIN_RGBA_CHANNEL_VALUE;
  }

  if (fixedColor.alpha % 1 !== 0) {
    fixedColor.alpha = Math.round(fixedColor.alpha);
  }

  if (Number.isNaN(fixedColor.hue)) {
    fixedColor.hue = MIN_HUE_VALUE;
  }

  fixedColor.hue = (
    MAX_HUE_VALUE_EXCLUDING
    + (fixedColor.hue % MAX_HUE_VALUE_EXCLUDING)
  ) % MAX_HUE_VALUE_EXCLUDING;

  for (const channel of [`saturation`, `lightness`]) {
    if (Number.isNaN(fixedColor[channel])) {
      fixedColor[channel] = MIN_SATURATION_LIGHTNESS_VALUE;
    }

    if (fixedColor[channel] > MAX_SATURATION_LIGHTNESS_VALUE) {
      fixedColor[channel] = MAX_SATURATION_LIGHTNESS_VALUE;
    }

    if (fixedColor[channel] < MIN_SATURATION_LIGHTNESS_VALUE) {
      fixedColor[channel] = MIN_SATURATION_LIGHTNESS_VALUE;
    }
  }

  return fixedColor;
};

const brightness = (color, ...excessiveArguments) => {
  if (excessiveArguments.length > 0) {
    throw new TypeError(`Color.brightness expected 1 argument, received ${excessiveArguments.length + 1}`);
  }

  checkRgbColorValidity(color);

  return Color.brightness(color);
};

const parseHex = (hex, ...excessiveArguments) => {
  if (excessiveArguments.length > 0) {
    throw new TypeError(`Color.parseHex expected 1 argument, received ${excessiveArguments.length + 1}`);
  }

  if (typeof hex !== `string`) {
    throw new TypeError(`Expected the passed hex to be a string, received ${typeof hex}`);
  }

  return Color.parseHex(hex);
};

const createHex = (color, ...excessiveArguments) => {
  if (excessiveArguments.length > 0) {
    throw new TypeError(`Color.createHex expected 1 argument, received ${excessiveArguments.length + 1}`);
  }

  checkRgbColorValidity(color);

  return Color.createHex(color);
};

const rgbToHsl = (color, ...excessiveArguments) => {
  if (excessiveArguments.length > 0) {
    throw new TypeError(`Color.rgbToHsl expected 1 argument, received ${excessiveArguments.length + 1}`);
  }

  checkRgbColorValidity(color);

  return Color.rgbToHsl(color);
};

const hslToRgb = (color, ...excessiveArguments) => {
  if (excessiveArguments.length > 0) {
    throw new TypeError(`Color.hslToRgb expected 1 argument, received ${excessiveArguments.length + 1}`);
  }

  checkHslColorValidity(color);

  return Color.hslToRgb(color);
};

const overlay = (...colors) => {
  for (const color of colors) {
    checkRgbColorValidity(color);
  }

  return Color.overlay(...colors);
};

const colorClass = {
  normalizeRgbColor,
  normalizeHslColor,
  brightness,
  parseHex,
  createHex,
  overlay,
  rgbToHsl,
  hslToRgb,
};

export default colorClass;

export {
  checkRgbColorValidity,
};

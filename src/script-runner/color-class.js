/* eslint-disable max-len */

import Color from "../color";

const RGBA_CHANNELS = [`red`, `green`, `blue`, `alpha`];
const MIN_RGBA_CHANNEL_VALUE = 0;
const MAX_RGBA_CHANNEL_VALUE = 255;

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
      throw new TypeError(`The ${channel} channel is out of range 0..255 (received ${rgbColor[channel]})`);
    }
  });
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
      } catch (error) {
        try {
          fixedColor[channel] = parseInt(String(fixedColor[channel]));
        } catch (secondError) {
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

const overlay = (...colors) => {
  for (const color of colors) {
    checkRgbColorValidity(color);
  }

  return Color.overlay(...colors);
};

const colorClass = {
  normalizeRgbColor,
  brightness,
  parseHex,
  createHex,
  overlay,
};

export default colorClass;
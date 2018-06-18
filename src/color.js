const HEX = 16;
const CHANNEL = 255;
const RED_MAX_PART = 0.2126;
const GREEN_MAX_PART = 0.7152;
const BLUE_MAX_PART = 0.0722;

class Color {
  static createHex ({ red, green, blue, alpha }) {
    const redHex = red.toString(HEX).padStart(2, 0);
    const greenHex = green.toString(HEX).padStart(2, 0);
    const blueHex = blue.toString(HEX).padStart(2, 0);
    const alphaHex = alpha.toString(HEX).padStart(2, 0);

    return `#${alphaHex}${redHex}${greenHex}${blueHex}`;
  }

  static createCssRgb ({ red, green, blue, alpha = CHANNEL }) {
    return `rgba(${red}, ${green}, ${blue}, ${alpha / CHANNEL})`;
  }

  static brightness ({ red, green, blue }) {
    const redPart = RED_MAX_PART * (red / CHANNEL);
    const greenPart = GREEN_MAX_PART * (green / CHANNEL);
    const bluePart = BLUE_MAX_PART * (blue / CHANNEL);

    return redPart + greenPart + bluePart;
  }

  static overlay (...colors) {
    const finalColor = {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 255,
    };

    colors.forEach((color) => {
      if (color.alpha === 0) {
        return;
      }

      if (color.alpha === CHANNEL) {
        finalColor.red = color.red;
        finalColor.green = color.green;
        finalColor.blue = color.blue;
      }

      const { red, green, blue } = color;
      const alpha = color.alpha / CHANNEL;

      const newRed = alpha * (red - finalColor.red) + finalColor.red;
      const newGreen = alpha * (green - finalColor.green) + finalColor.green;
      const newBlue = alpha * (blue - finalColor.blue) + finalColor.blue;

      finalColor.red = Math.round(newRed);
      finalColor.green = Math.round(newGreen);
      finalColor.blue = Math.round(newBlue);
    });

    return finalColor;
  }

  static parseHex (hex) {
    const color = {
      red: NaN,
      green: NaN,
      blue: NaN,
      alpha: NaN,
    };

    if (!hex.startsWith(`#`)) {
      return null;
    }

    switch (hex.length) {
      /* eslint-disable no-magic-numbers */
      case `#rgb`.length: {
        color.red = parseInt(hex.slice(1, 2).repeat(2), HEX);
        color.green = parseInt(hex.slice(2, 3).repeat(2), HEX);
        color.blue = parseInt(hex.slice(3, 4).repeat(2), HEX);
        color.alpha = 255;

        break;
      }
      case `#argb`.length: {
        color.alpha = parseInt(hex.slice(1, 2).repeat(2), HEX);
        color.red = parseInt(hex.slice(2, 3).repeat(2), HEX);
        color.green = parseInt(hex.slice(3, 4).repeat(2), HEX);
        color.blue = parseInt(hex.slice(4, 5).repeat(2), HEX);

        break;
      }
      case `#rrggbb`.length: {
        color.red = parseInt(hex.slice(1, 3), HEX);
        color.green = parseInt(hex.slice(3, 5), HEX);
        color.blue = parseInt(hex.slice(5, 7), HEX);
        color.alpha = 255;

        break;
      }
      case `#aarrggbb`.length: {
        color.alpha = parseInt(hex.slice(1, 3), HEX);
        color.red = parseInt(hex.slice(3, 5), HEX);
        color.green = parseInt(hex.slice(5, 7), HEX);
        color.blue = parseInt(hex.slice(7, 9), HEX);

        break;
      }
      /* eslint-enable no-magic-numbers */
      default: {
        return null;
      }
    }

    return color;
  }

  /* eslint-disable no-magic-numbers */
  static rgbToHsl (rgbColor) {
    const red = rgbColor.red / 255;
    const green = rgbColor.green / 255;
    const blue = rgbColor.blue / 255;

    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;

    const lightness = (max + min) / 2;

    const saturation = (delta === 0)
      ? 0
      : delta / (1 - Math.abs(2 * lightness - 1));

    let hue = 0;

    if (delta !== 0) {
      if (max === red) {
        hue = 60 * (((green - blue) / delta) % 6);
      }

      if (max === green) {
        hue = 60 * ((blue - red) / delta + 2);
      }

      if (max === blue) {
        hue = 60 * ((red - green) / delta + 4);
      }
    }

    return {
      hue,
      saturation,
      lightness,
      alpha: rgbColor.alpha,
    };
  }

  static hslToRgb (hslColor) {
    const { hue, saturation, lightness, alpha } = hslColor;

    const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    const m = lightness - c / 2;

    let r;
    let g;
    let b;

    // Making conditions look similarly to a <= b < c, as in convertation
    // formalas
    /* eslint-disable yoda */
    if (0 <= hue && hue < 60) {
      [r, g, b] = [c, x, 0];
    }

    if (60 <= hue && hue < 120) {
      [r, g, b] = [x, c, 0];
    }

    if (120 <= hue && hue < 180) {
      [r, g, b] = [0, c, x];
    }

    if (180 <= hue && hue < 240) {
      [r, g, b] = [0, x, c];
    }

    if (240 <= hue && hue < 300) {
      [r, g, b] = [x, 0, c];
    }

    if (300 <= hue && hue < 360) {
      [r, g, b] = [c, 0, x];
    }

    const red = Math.round((r + m) * 255);
    const green = Math.round((g + m) * 255);
    const blue = Math.round((b + m) * 255);

    return {
      red,
      green,
      blue,
      alpha,
    };
  }
  /* eslint-enable no-magic-numbers yoda */
}

export default Color;
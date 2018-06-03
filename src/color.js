const HEX = 16;
const CHANNEL = 255;
const RED_MAX_PART = 0.2126;
const GREEN_MAX_PART = 0.7152;
const BLUE_MAX_PART = 0.0722;

class Color {
  static hex ({ red, green, blue, alpha }) {
    const redHex = red.toString(HEX).padStart(2, 0);
    const greenHex = green.toString(HEX).padStart(2, 0);
    const blueHex = blue.toString(HEX).padStart(2, 0);
    const alphaHex = alpha.toString(HEX).padStart(2, 0);

    return `#${alphaHex}${redHex}${greenHex}${blueHex}`;
  }

  static cssRgb ({ red, green, blue, alpha = CHANNEL }) {
    return `rgba(${red}, ${green}, ${blue}, ${alpha / CHANNEL}`;
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
}

export default Color;
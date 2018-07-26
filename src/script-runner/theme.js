/* eslint-disable max-len */
import { checkRgbColorValidity } from "./color-class";

const createTheme = (originalTheme) => {
  return {
    getVariable (variableName, ...excessiveArguments) {
      if (excessiveArguments.length > 0) {
        throw new TypeError(`theme.getVariable expected 1 argument, received ${excessiveArguments.length + 1}`);
      }

      if (typeof variableName !== `string`) {
        throw new TypeError(`The variableName is not a string (received ${typeof variableName})`);
      }

      const color = originalTheme.variables[variableName];

      if (color) {
        return {
          ...color,
        };
      }

      return null;
    },
    setVariable (variableName, color, ...excessiveArguments) {
      if (excessiveArguments.length > 0) {
        throw new TypeError(`theme.setVariable expected 2 arguments, received ${excessiveArguments.length + 2}`);
      }

      if (typeof variableName !== `string`) {
        throw new TypeError(`The variableName is not a string (received ${typeof variableName})`);
      }

      checkRgbColorValidity(color);

      originalTheme.variables[variableName] = color;
    },
    getVariables (...excessiveArguments) {
      if (excessiveArguments.length > 0) {
        throw new TypeError(`theme.getVariables expected no arguments, received ${excessiveArguments.length}`);
      }

      return Object.keys(originalTheme.variables);
    },
  };
};

export default createTheme;

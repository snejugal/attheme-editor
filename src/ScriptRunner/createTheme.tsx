/* eslint-disable max-len */
import { checkRgbColorValidity } from "./colorClass";
import { Color } from "attheme-js/lib/types";

export default (originalTheme: Theme) => {
  return {
    getVariable(variableName: string, ...excess: unknown[]) {
      if (excess.length > 0) {
        throw new TypeError(`theme.getVariable expected 1 argument, received ${excess.length + 1}`);
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
    setVariable(variableName: string, color: Color, ...excess: unknown[]) {
      if (excess.length > 0) {
        throw new TypeError(`theme.setVariable expected 2 arguments, received ${excess.length + 2}`);
      }

      if (typeof variableName !== `string`) {
        throw new TypeError(`The variableName is not a string (received ${typeof variableName})`);
      }

      checkRgbColorValidity(color);

      originalTheme.variables[variableName] = color;
    },
    getVariables(...excess: unknown[]) {
      if (excess.length > 0) {
        throw new TypeError(`theme.getVariables expected no arguments, received ${excess.length}`);
      }

      return Object.keys(originalTheme.variables);
    },
  };
};

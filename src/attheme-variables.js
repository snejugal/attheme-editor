import defaultValues from "attheme-default-values";

const variables = Object.keys(defaultValues);
const lowercaseVariables = variables.map((x) => x.toLowerCase());
const allVariablesAmount = variables.length;

export {
  variables,
  lowercaseVariables,
  allVariablesAmount,
};
import { OPERATORS } from "./constants";

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const getValidOperators = (column) => {
  if (column === "*") {
    return OPERATORS.filter(
      (op) => op.value === "contains_substring" || op.value === "contains_word"
    );
  }
  return OPERATORS;
};

const isMultiSelectOperator = (operator) => {
  return operator === "in" || operator === "not_in";
};

export { generateId, getValidOperators, isMultiSelectOperator };

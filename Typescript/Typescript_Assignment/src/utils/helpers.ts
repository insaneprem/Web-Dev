import { OPERATORS } from "./constants";

interface obj{
  value:string,
  label:string
}
const generateId = () : string => {
  return Math.random().toString(36).substr(2, 9);
};

const getValidOperators = (column : string):obj[] => {
  if (column === "*") {
    return OPERATORS.filter(
      (op) => op.value === "contains_substring" || op.value === "contains_word"
    );
  }
  return OPERATORS;
};

const isMultiSelectOperator = (operator : string) : boolean => {
  return operator === "in" || operator === "not_in";
};

export { generateId, getValidOperators, isMultiSelectOperator };

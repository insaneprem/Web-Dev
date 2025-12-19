import React from "react";
import { LOGICAL_OPERATORS } from "../utils/constants";

const LogicalOperatorToggle = ({ operator, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`rounded-md font-medium px-3 py-1 ${
        operator === LOGICAL_OPERATORS.AND
          ? "bg-blue-100 text-blue-800"
          : "bg-green-100 text-green-800"
      }`}
    >
      {operator}
    </button>
  );
};

export default LogicalOperatorToggle;

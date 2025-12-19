import React, { useState } from "react";
import { COLUMNS, OPERATORS } from "../utils/constants";
import { getValidOperators, isMultiSelectOperator } from "../utils/helpers";
import ValueInput from "./ValueInput";

const FilterRule = ({ rule, onUpdate, onDelete, depth = 0 }) => {
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const validOperators = getValidOperators(rule.column);

  const handleColumnChange = (newColumn) => {
    const newValidOps = getValidOperators(newColumn);
    const isOperatorValid = newValidOps.find(op => op.value === rule.operator);

    if (!isOperatorValid) {
      setWarningMessage(
        `Operator "${rule.operator}" is not valid for column "${newColumn}".`
      );
      setShowWarning(true);
    } else {
      setShowWarning(false);
      setWarningMessage("");
    }

    onUpdate(rule.id, {
      column: newColumn,
      operator: rule.operator, 
      value: isMultiSelectOperator(rule.operator) ? [] : ""
    });
  };

  const handleOperatorChange = (newOperator) => {
    const validOps = getValidOperators(rule.column);
    const isAllowed = validOps.find(op => op.value === newOperator);

    if (!isAllowed) {
      setWarningMessage(
        `Operator "${newOperator}" is not valid for column "${rule.column}".`
      );
      setShowWarning(true);
    } else {
      setShowWarning(false);
      setWarningMessage("");
    }

    const newValue = isMultiSelectOperator(newOperator)
      ? Array.isArray(rule.value)
        ? rule.value
        : []
      : Array.isArray(rule.value)
      ? ""
      : rule.value;

    onUpdate(rule.id, {
      operator: newOperator,
      value: newValue
    });
  };

  const handleValueChange = (newValue) => {
    onUpdate(rule.id, { value: newValue });
  };

  return (
    <div
      className={`border border-gray-200 rounded-lg p-4 bg-white ${
        depth > 0 ? "ml-6" : ""
      }`}
    >
      <div className="flex items-center gap-3 flex-wrap">
        <select
          value={rule.column}
          onChange={(e) => handleColumnChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md bg-white min-w-48"
        >
          {COLUMNS.map((col) => (
            <option key={col.value} value={col.value}>
              {col.label}
            </option>
          ))}
        </select>

        <select
          value={rule.operator}
          onChange={(e) => handleOperatorChange(e.target.value)}
          className={`px-3 py-2 border rounded-md bg-white min-w-40 ${
            showWarning ? "border-yellow-500 bg-yellow-50" : "border-gray-300"
          }`}
        >
          {(rule.column === "*" ? OPERATORS : validOperators).map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>

        <ValueInput
          value={rule.value}
          operator={rule.operator}
          onChange={handleValueChange}
        />

        <button
          onClick={() => onDelete(rule.id)}
          className="p-2 text-red-500 rounded-md"
          title="Delete rule"
        >
          ✕
        </button>
      </div>

      {showWarning && (
        <p className="text-yellow-700 text-sm mt-2">{warningMessage}</p>
      )}
    </div>
  );
};

export default FilterRule;

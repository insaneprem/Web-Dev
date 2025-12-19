import React from "react";

const FilterActions = ({ onAddRule, onAddGroup }) => {
  return (
    <div className="flex gap-3 pt-4 border-t border-gray-200">
      <button
        onClick={onAddRule}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        + Add Filter
      </button>
      <button
        onClick={onAddGroup}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md"
      >
        + Add Filter Group
      </button>
    </div>
  );
};

export default FilterActions;

import React from "react";
import LogicalOperatorToggle from "./LogicalOperatorToggle";
interface filterRule {
  id: string;
  column: string;
  operator: string;
  value: string | string[];
}

interface filterGroup {
  id: string,
  logical_operator: string,
  rules: (filterRule | filterGroup)[]
}
interface Props {
  group: filterGroup;
  onToggleOperator: (groupId: string) => void;
  onToggleCollapse: (groupId: string) => void;
  onAddRule: (groupId?: string | null) => void;
  onAddGroup: (parentGroupId?: string | null) => void;
  onDelete: (itemId: string) => void;
  isCollapsed: boolean;
  hasRules: boolean;
}

const FilterGroupHeader = ({
  group,
  onToggleOperator,
  onToggleCollapse,
  onAddRule,
  onAddGroup,
  onDelete,
  isCollapsed,
  hasRules,
}: Props): React.ReactElement => {
  return (
    <div className="flex items-center gap-3 mb-4">
      {hasRules && (
        <button
          onClick={() => onToggleCollapse(group.id)}
          className="p-1 rounded"
        >
          {isCollapsed ? "▶" : "▼"}
        </button>
      )}

      <LogicalOperatorToggle
        operator={group.logical_operator}
        onToggle={() => onToggleOperator(group.id)}
      />

      <div className="flex gap-2">
        <button
          onClick={() => onAddRule(group.id)}
          className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
        >
          + Add Rule
        </button>
        <button
          onClick={() => onAddGroup(group.id)}
          className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md text-sm"
        >
          + Add Group
        </button>
      </div>

      <button
        onClick={() => onDelete(group.id)}
        className="p-1 text-red-500 rounded-md ml-auto"
        title="Delete group"
      >
        ✕
      </button>
    </div>
  );
};

export default FilterGroupHeader;

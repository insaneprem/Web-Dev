import React from "react";
import FilterGroupHeader from "./FilterGroupHeader";
import FilterRule from "./FilterRule";
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

type Props = {
  group: filterGroup;
  onUpdateRule: (ruleId: string, updates: any) => void;
  onDeleteItem: (itemId: string) => void;
  onToggleOperator: (groupId: string) => void;
  onAddRule: (groupId?: string | null | undefined) => void;
  onAddGroup: (parentGroupId?: string | null) => void;
  collapsedGroups: Set<string>;
  onToggleCollapse: (groupId: string) => void;
  depth?: number;
}
const FilterGroup = ({
  group,
  onUpdateRule,
  onDeleteItem,
  onToggleOperator,
  onAddRule,
  onAddGroup,
  collapsedGroups,
  onToggleCollapse,
  depth = 0,
}: Props): React.ReactElement => {
  const isCollapsed = collapsedGroups.has(group.id);
  const hasRules = group.rules && group.rules.length > 0;

  const renderLogicalSeparator = (operator: string): React.ReactElement => (
    <div className="flex justify-center py-2">
      <LogicalOperatorToggle operator={operator} onToggle={() => { }} />
    </div>
  );

  return (
    <div className={`${depth > 0 ? "ml-6" : ""}`}>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
        <FilterGroupHeader
          group={group}
          onToggleOperator={onToggleOperator}
          onToggleCollapse={onToggleCollapse}
          onAddRule={onAddRule}
          onAddGroup={onAddGroup}
          onDelete={onDeleteItem}
          isCollapsed={isCollapsed}
          hasRules={hasRules}
        />

        {!isCollapsed && hasRules && (
          <div className="space-y-3">
            {group.rules.map((rule, index) => (
              <div key={rule.id}>
                {index > 0 && renderLogicalSeparator(group.logical_operator)}
                {"rules" in rule ? (
                  <FilterGroup
                    group={rule}
                    onUpdateRule={onUpdateRule}
                    onDeleteItem={onDeleteItem}
                    onToggleOperator={onToggleOperator}
                    onAddRule={onAddRule}
                    onAddGroup={onAddGroup}
                    collapsedGroups={collapsedGroups}
                    onToggleCollapse={onToggleCollapse}
                    depth={depth + 1}
                  />
                ) : (
                  <FilterRule
                    rule={rule}
                    onUpdate={onUpdateRule}
                    onDelete={onDeleteItem}
                    depth={depth + 1}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterGroup;

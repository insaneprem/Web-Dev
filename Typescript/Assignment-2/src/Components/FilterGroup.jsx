import React from "react";
import FilterGroupHeader from "./FilterGroupHeader";
import FilterRule from "./FilterRule";
import LogicalOperatorToggle from "./LogicalOperatorToggle";

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
}) => {
  const isCollapsed = collapsedGroups.has(group.id);
  const hasRules = group.rules && group.rules.length > 0;

  const renderLogicalSeparator = (operator) => (
    <div className="flex justify-center py-2">
      <LogicalOperatorToggle operator={operator} onToggle={() => {}} />
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
                {rule.rules ? (
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

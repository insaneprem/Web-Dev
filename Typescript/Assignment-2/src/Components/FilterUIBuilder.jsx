import React from "react";
import { useFilterState } from "../hooks/useFilterState";
import { LOGICAL_OPERATORS } from "../utils/constants";
import LogicalOperatorToggle from "./LogicalOperatorToggle";
import FilterGroup from "./FilterGroup";
import FilterRule from "./FilterRule";
import FilterActions from "./FilterActions";

const FilterUIBuilder = () => {
  const {
    filter,
    collapsedGroups,
    handleRuleUpdate,
    addRule,
    addGroup,
    deleteItem,
    toggleGroupOperator,
    toggleCollapse,
  } = useFilterState({
    logical_operator: LOGICAL_OPERATORS.AND,
    rules: [],
  });

  const renderLogicalSeparator = (operator) => (
    <div className="flex justify-center py-2">
      <LogicalOperatorToggle operator={operator} onToggle={() => {}} />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Filter Builder
        </h1>

        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <LogicalOperatorToggle
              operator={filter.logical_operator}
              onToggle={() => toggleGroupOperator("root")}
            />
          </div>

          <div className="space-y-3">
            {filter.rules.map((rule, index) => (
              <div key={rule.id}>
                {index > 0 && renderLogicalSeparator(filter.logical_operator)}
                {rule.rules ? (
                  <FilterGroup
                    group={rule}
                    onUpdateRule={handleRuleUpdate}
                    onDeleteItem={deleteItem}
                    onToggleOperator={toggleGroupOperator}
                    onAddRule={addRule}
                    onAddGroup={addGroup}
                    collapsedGroups={collapsedGroups}
                    onToggleCollapse={toggleCollapse}
                    depth={0}
                  />
                ) : (
                  <FilterRule
                    rule={rule}
                    onUpdate={handleRuleUpdate}
                    onDelete={deleteItem}
                    depth={0}
                  />
                )}
              </div>
            ))}
          </div>

          <FilterActions
            onAddRule={() => addRule()}
            onAddGroup={() => addGroup()}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterUIBuilder;

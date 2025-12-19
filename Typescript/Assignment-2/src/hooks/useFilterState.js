import { useState } from "react";
import { generateId } from "../utils/helpers";
import { LOGICAL_OPERATORS } from "../utils/constants";

const useFilterState = (initialFilter) => {
  const [filter, setFilter] = useState(initialFilter);
  const [collapsedGroups, setCollapsedGroups] = useState(new Set());

  const updateRule = (rules, ruleId, updates) => {
    return rules.map((rule) => {
      if (rule.id === ruleId) return { ...rule, ...updates };

      if (rule.rules)
        return { ...rule, rules: updateRule(rule.rules, ruleId, updates) };

      return rule;
    });
  };

  const handleRuleUpdate = (ruleId, updates) => {
    setFilter((prev) => ({
      ...prev,
      rules: updateRule(prev.rules, ruleId, updates),
    }));
  };

  const addRule = (groupId = null) => {
    const newRule = {
      id: generateId(),
      column: "brand_names",
      operator: "contains_substring",
      value: "",
    };

    const addToGroup = (rules) => {
      return rules.map((rule) => {
        if (rule.id === groupId && rule.rules) {
          return { ...rule, rules: [...rule.rules, newRule] };
        }
        if (rule.rules) {
          return { ...rule, rules: addToGroup(rule.rules) };
        }
        return rule;
      });
    };

    setFilter((prev) =>
      !groupId
        ? { ...prev, rules: [...prev.rules, newRule] }
        : { ...prev, rules: addToGroup(prev.rules) }
    );
  };

  const addGroup = (parentGroupId = null) => {
    const newGroup = {
      id: generateId(),
      logical_operator: LOGICAL_OPERATORS.AND,
      rules: [
        {
          id: generateId(),
          column: "brand_names",
          operator: "contains_substring",
          value: "",
        },
      ],
    };

    const addToGroup = (rules) => {
      return rules.map((rule) => {
        if (rule.id === parentGroupId && rule.rules) {
          return { ...rule, rules: [...rule.rules, newGroup] };
        }
        if (rule.rules) {
          return { ...rule, rules: addToGroup(rule.rules) };
        }
        return rule;
      });
    };

    setFilter((prev) =>
      !parentGroupId
        ? { ...prev, rules: [...prev.rules, newGroup] }
        : { ...prev, rules: addToGroup(prev.rules) }
    );
  };

  const deleteItem = (itemId) => {
    const removeFromRules = (rules) => {
      return rules.filter((rule) => {
        if (rule.id === itemId) return false;
        if (rule.rules) rule.rules = removeFromRules(rule.rules);
        return true;
      });
    };

    setFilter((prev) => ({
      ...prev,
      rules: removeFromRules(prev.rules),
    }));
  };

  const toggleGroupOperator = (groupId) => {

    const toggle = (rules) => {
      return rules.map((rule) => {
        if (rule.id === groupId && rule.logical_operator) {
          return {
            ...rule,
            logical_operator:
              rule.logical_operator === LOGICAL_OPERATORS.AND
                ? LOGICAL_OPERATORS.OR
                : LOGICAL_OPERATORS.AND,
          };
        }
        if (rule.rules) {
          return { ...rule, rules: toggle(rule.rules) };
        }
        return rule;
      });
    };

    setFilter((prev) =>
      groupId === "root"
        ? {
            ...prev,
            logical_operator:
              prev.logical_operator === LOGICAL_OPERATORS.AND
                ? LOGICAL_OPERATORS.OR
                : LOGICAL_OPERATORS.AND,
          }
        : {
            ...prev,
            rules: toggle(prev.rules),
          }
    );
  };

  const toggleCollapse = (groupId) => {
    setCollapsedGroups((prev) => {
      const newSet = new Set(prev);
      newSet.has(groupId) ? newSet.delete(groupId) : newSet.add(groupId);
      return newSet;
    });
  };

  return {
    filter,
    collapsedGroups,
    handleRuleUpdate,
    addRule,
    addGroup,
    deleteItem,
    toggleGroupOperator,
    toggleCollapse,
  };
};

export { useFilterState };

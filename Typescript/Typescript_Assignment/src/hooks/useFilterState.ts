import { useState } from "react";
import { generateId } from "../utils/helpers";
import { LOGICAL_OPERATORS } from "../utils/constants";

interface filterRule {
  type: "rule";
  id: string;
  column: string;
  operator: string;
  value: string | string[];
}

interface filterGroup {
  type: "group";
  id: string;
  logical_operator: string;
  rules: filterItem[];
}

type filterItem = filterRule | filterGroup;

interface ReturnVal {
  filter: filterGroup;
  collapsedGroups: Set<string>;
  handleRuleUpdate: (ruleId: string, updates: any) => void;
  addRule: (groupId?: string | null) => void;
  addGroup: (parentGroupId?: string | null) => void;
  deleteItem: (itemId: string) => void;
  toggleGroupOperator: (groupId: string) => void;
  toggleCollapse: (groupId: string) => void;
}
const useFilterState = (initialFilter: filterGroup): ReturnVal => {
  const [filter, setFilter] = useState(initialFilter);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const updateRule = (
    rules: filterItem[],
    ruleId: string,
    updates: any
  ): filterItem[] => {
    return rules.map((rule) => {
      if (rule.id === ruleId && rule.type == "rule") return { ...rule, ...updates };

      if (rule.type == "group")
        return { ...rule, rules: updateRule(rule.rules, ruleId, updates) };

      return rule;
    });
  };

  const handleRuleUpdate = (ruleId: string, updates: any): void => {
    setFilter((prev) => ({
      ...prev,
      rules: updateRule(prev.rules, ruleId, updates),
    }));
  };

  const addRule = (groupId: string | null = null) => {
    const newRule : filterRule = {
      type:"rule",
      id: generateId(),
      column: "brand_names",
      operator: "contains_substring",
      value: "",
    };

    const addToGroup = (rules: filterItem[]): filterItem[] => {
      return rules.map((rule) => {
        if (rule.id === groupId && rule.type == "group") {
          return { ...rule, rules: [...rule.rules, newRule] };
        }
        if (rule.type == "group") {
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

  const addGroup = (parentGroupId: string | null = null) => {
    const newGroup : filterGroup = {
      type: "group",
      id: generateId(),
      logical_operator: LOGICAL_OPERATORS.AND,
      rules: [
        {
          type:"rule",
          id: generateId(),
          column: "brand_names",
          operator: "contains_substring",
          value: "",
        },
      ],
    };

    const addToGroup = (
      rules: filterItem[]
    ): filterItem[] => {
      return rules.map((rule) => {
        if (rule.id === parentGroupId && rule.type == "group") {
          return { ...rule, rules: [...rule.rules, newGroup] };
        }
        if (rule.type == "group") {
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

  const deleteItem = (itemId: string): void => {
    const removeFromRules = (
      rules: filterItem[]
    ): filterItem[] => {
      return rules
      .filter((rule) => rule.id !== itemId)
      .map((rule) => {
        if (rule.type === "group") {
          return { ...rule, rules: removeFromRules(rule.rules) };
        }
        return rule;
      });
    };

    setFilter((prev) => ({
      ...prev,
      rules: removeFromRules(prev.rules),
    }));
  };

  const toggleGroupOperator = (groupId: string): void => {
    const toggle = (
      rules: filterItem[]
    ): filterItem[] => {
      return rules.map((rule) => {
        if (rule.id === groupId && rule.type == "group") {
          return {
            ...rule,
            logical_operator:
              rule.logical_operator === LOGICAL_OPERATORS.AND
                ? LOGICAL_OPERATORS.OR
                : LOGICAL_OPERATORS.AND,
          };
        }
        if (rule.type == "group") {
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

  const toggleCollapse = (groupId: string): void => {
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

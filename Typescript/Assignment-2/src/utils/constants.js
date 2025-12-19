const COLUMNS = [
  { value: "*", label: "*" },
  { value: "brand_names", label: "Brand Names" },
  { value: "manufacturer_d_names", label: "Manufacturer Descriptive Names" },
  { value: "product_codes", label: "Product Codes" },
  { value: "event_type", label: "Event Type" },
  { value: "event_text", label: "Event Text" },
  { value: "event_text_description", label: "Event Text Description" },
  { value: "event_text_additional", label: "Event Text Additional" },
  { value: "patient_problems", label: "Patient Problems" },
  { value: "product_problems", label: "Product Problems" },
  { value: "web_address", label: "Web Address" },
];

const OPERATORS = [
  { value: "contains_substring", label: "Contains Substring" },
  { value: "contains_word", label: "Contains Word" },
  { value: "not_contains", label: "Not Contains" },
  { value: "not_contains_word", label: "Not Contains Word" },
  { value: "in", label: "In" },
  { value: "not_in", label: "Not In" },
];

const LOGICAL_OPERATORS = {
  AND: "AND",
  OR: "OR",
};

export { COLUMNS, OPERATORS, LOGICAL_OPERATORS };

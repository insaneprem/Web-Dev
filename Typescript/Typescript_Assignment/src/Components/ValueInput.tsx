import React, { useState, useEffect } from 'react';
import { isMultiSelectOperator } from '../utils/helpers';
type Props = {
  value: string | string[];
  operator: string;
  onChange: (val: string | string[]) => void;
  placeholder?: string;
}
const ValueInput = ({ value, operator, onChange, placeholder = "Enter value" } : Props) : React.ReactElement => {
  const isMultiSelect = isMultiSelectOperator(operator);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (isMultiSelect && Array.isArray(value)) {
      setInput(value.join(', '));
    } else if (!isMultiSelect && typeof value === 'string') {
      setInput(value);
    }
  }, [value, operator]);

  const handleBlur = ():void => {
    if (isMultiSelect) {
      const values = input
        .split(',')
        .map(v => v.trim())
        .filter(v => v);
      onChange(values);
    } else {
      onChange(input);
    }
  };

  return (
    <input
      type="text"
      placeholder={isMultiSelect ? "Enter values separated by commas" : placeholder}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onBlur={handleBlur}
      className="flex-1 px-3 py-2 border border-gray-300 rounded-md min-w-48"
    />
  );
};

export default ValueInput;

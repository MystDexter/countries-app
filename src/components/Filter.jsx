import React from "react";
import { FormControl, NativeSelect } from "@material-ui/core";

const Filter = ({ label, options, onFilter }) => {
  return (
    <FormControl>
      <NativeSelect defaultValue="" onChange={(e) => onFilter(e.target.value)}>
        <option value=""> {label} </option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Filter;

import React from "react";
import {
  FormControl,
  FormControlLabel,
  NativeSelect,
  Checkbox,
} from "@material-ui/core";

const Filter = ({ label, options, onFilter, singleOption = false }) => {
  return (
    <FormControl>
      {singleOption ? (
        <FormControlLabel
          control={<Checkbox onChange={(e) => onFilter(e.target.checked)} />}
          label={label}
        />
      ) : (
        <NativeSelect
          defaultValue=""
          onChange={(e) => onFilter(e.target.value)}
        >
          <option value=""> {label} </option>
          {options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </NativeSelect>
      )}
    </FormControl>
  );
};

export default Filter;

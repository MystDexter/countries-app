import React from "react";
import {
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  Checkbox,
} from "@material-ui/core";

const Filter = ({ label, options, onFilter, singleOption = false }) => {
  return singleOption ? (
    <FormControl>
      <FormControlLabel
        control={<Checkbox onChange={(e) => onFilter(e.target.checked)} />}
        label={label}
      />
    </FormControl>
  ) : (
    <FormControl>
      <Select
        defaultValue=""
        onChange={(e) => onFilter(e.target.value)}
        displayEmpty
      >
        <MenuItem value=""> {label} </MenuItem>
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Filter;

import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  Checkbox,
} from "@material-ui/core";

const Filter = ({ label, options, onFilter, singleOption }) => {
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
        disableUnderline
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

Filter.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  onFilter: PropTypes.func.isRequired,
  singleOption: PropTypes.bool,
};

export default Filter;

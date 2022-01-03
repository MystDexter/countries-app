import React from "react";
import { FormControl, NativeSelect, Typography } from "@material-ui/core";

const Sort = ({ label, options, onSort }) => {
  return (
    <FormControl>
      <Typography variant="body2">
        <b>{label}</b>
      </Typography>
      <NativeSelect onChange={(e) => onSort(e.target.value)}>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Sort;

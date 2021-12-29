import React, { useState } from "react";
import {
  FormControl,
  InputAdornment,
  NativeSelect,
  TextField,
  Icon,
} from "@material-ui/core";

const Filter = ({ onFilter, data }) => {
  const [isSelected, setIsSelected] = useState(false);
  const iconAdornment = !isSelected
    ? {
        endAdornment: (
          <InputAdornment position="end">
            <Icon>search</Icon>
          </InputAdornment>
        ),
      }
    : {};

  const regions = [...new Set(data.map((item) => item.region))];

  return (
    <section className="filter">
      <FormControl>
        <TextField
          variant="outlined"
          size="small"
          label="Search country or region..."
          type="search"
          onChange={(e) => {
            onFilter(e.target.value);
          }}
          onFocus={(e) => setIsSelected(true)}
          onBlur={(e) => setIsSelected(false)}
          InputProps={iconAdornment}
        />
      </FormControl>
      <FormControl>
        <NativeSelect
          defaultValue=""
          onChange={(e) => onFilter(e.target.value)}
        >
          <option value=""> Filter by region </option>
          {regions.map((region, i) => (
            <option key={i} value={region}>
              {region}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </section>
  );
};

export default Filter;

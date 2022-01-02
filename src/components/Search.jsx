import React, { useState } from "react";
import {
  FormControl,
  InputAdornment,
  TextField,
  Icon,
} from "@material-ui/core";

const Search = ({ onSearch }) => {
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

  return (
    <FormControl>
      <TextField
        variant="outlined"
        size="small"
        label="Search country..."
        type="search"
        onChange={(e) => {
          onSearch(e.target.value);
        }}
        onFocus={(e) => setIsSelected(true)}
        onBlur={(e) => setIsSelected(false)}
        InputProps={iconAdornment}
      />
    </FormControl>
  );
};

export default Search;

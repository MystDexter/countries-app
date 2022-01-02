import React from "react";
import { FormControl, NativeSelect } from "@material-ui/core";

const Filter = ({ onFilter, options }) => {
  return (
    // <section className="filter">
    //   <FormControl>
    //     <Button>Smaller than Lithuania</Button>
    //   </FormControl>
    <FormControl>
      <NativeSelect defaultValue="" onChange={(e) => onFilter(e.target.value)}>
        <option value=""> Filter by region </option>
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

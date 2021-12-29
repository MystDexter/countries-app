import React from "react";
import { FormControl, NativeSelect, TextField } from "@material-ui/core";

const Filter = ({ data }) => {
  const regions = [...new Set(data.map((item) => item.region))];

  return (
    <section className="filter">
      <FormControl>
        <TextField variant="outlined" label="Find a country" type="search" />
      </FormControl>
      <FormControl>
        <NativeSelect
          defaultValue=""
          // onChange={(e) => handleCountryChange(e.target.value)}
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

import React, { useState, useEffect, Fragment } from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core";
import { filterRegions } from "../api";
import { Filter, Search } from ".";

const Countries = ({ countryData: initialData }) => {
  const [countries, setCountries] = useState(initialData);

  useEffect(() => {
    setCountries(initialData);
  }, [initialData]);

  console.log(countries);
  console.log(initialData);

  const regions = [...new Set(initialData.map((data) => data.region))];

  const handleSearch = (searchValue) => {
    if (searchValue) {
      const searchedCountries = countries.filter(({ name }) => {
        const value = searchValue.trim().toLowerCase();
        return name.toLowerCase().indexOf(value) > -1;
      });
      setCountries(searchedCountries);
    } else {
      setCountries(initialData);
    }
  };

  const handleRegionFilter = async (region) => {
    region.length
      ? setCountries(await filterRegions(region))
      : setCountries(initialData);
  };

  return (
    <Fragment>
      <section className="filter">
        <Search onSearch={handleSearch} />
        <Filter options={regions} onFilter={handleRegionFilter} />
      </section>
      {countries.length > 0 ? (
        <List sx={{ width: "100%" }}>
          {countries.map((data, i) => {
            const { name, region, area, flag } = data;
            return (
              <Fragment key={i}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="flag" src={flag} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={name}
                    secondary={
                      <Fragment>
                        <Typography variant="body2">
                          <b>Region:</b> {region}
                        </Typography>
                        <b>Area Size:</b> {area} km²
                      </Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </Fragment>
            );
          })}
        </List>
      ) : (
        <Typography align="center">
          No countries match that search term
        </Typography>
      )}
    </Fragment>
  );
};

export default Countries;

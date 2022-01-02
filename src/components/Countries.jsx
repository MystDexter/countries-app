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

const Countries = ({ countries }) => {
  const [filtered, setFiltered] = useState(countries);

  useEffect(() => {
    setFiltered(countries);
  }, [countries]);

  const regions = [...new Set(countries.map((data) => data.region))];

  const handleSearch = (searchValue) => {
    if (searchValue) {
      const searchedCountries = countries.filter(({ name }) => {
        const value = searchValue.trim().toLowerCase();
        return name.toLowerCase().indexOf(value) > -1;
      });
      setFiltered(searchedCountries);
    } else {
      setFiltered(countries);
    }
  };

  const handleRegionFilter = async (region) => {
    region.length
      ? setFiltered(await filterRegions(region))
      : setFiltered(countries);
  };

  const handleAreaFilter = () => {
    const lithuania = countries.filter(({ name }) => {
      return name == "Lithuania";
    });
    const [{ area: lithuaniaArea }] = lithuania;
    const areaFilter = countries.filter((country) => {
      return country.area < lithuaniaArea;
    });
    setFiltered(areaFilter);
  };

  return (
    <Fragment>
      <section className="filter">
        <Search onSearch={handleSearch} />
        <div>
          <Filter
            label={"Filter by region"}
            options={regions}
            onFilter={handleRegionFilter}
          />
          <Filter
            label={"Filter by area"}
            options={["Smaller than Lithuania"]}
            onFilter={handleAreaFilter}
          />
        </div>
      </section>
      {filtered.length > 0 ? (
        <List sx={{ width: "100%" }}>
          {filtered.map((data, i) => {
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

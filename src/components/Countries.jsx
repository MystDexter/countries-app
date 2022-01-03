import React, { useState, useEffect, Fragment } from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Icon,
  IconButton,
  Toolbar,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { filterRegions } from "../api";
import { Filter, Search, Sort } from ".";
import _ from "lodash";

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    filter: {
      marginLeft: theme.spacing(2),
    },
    flex: {
      display: "flex",
      alignItems: "center",
    },
    countryListItem: {
      paddingLeft: theme.spacing(2.5),
    },
  })
);

const Countries = ({ countries }) => {
  const classes = useStyles();

  const [filtered, setFiltered] = useState(countries);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("name");

  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "area", label: "Area" },
  ];

  const regions = [...new Set(countries.map((data) => data.region))];

  useEffect(() => {
    setFiltered(countries);
  }, [countries]);

  const handleSort = () => {
    setSortOrder(sortOrder == "asc" ? "desc" : "asc");
  };

  const handleSortBy = (e) => {
    setSortBy(e);
  };

  useEffect(() => {
    const sorted = _.orderBy(filtered, [sortBy], [sortOrder]);
    setFiltered(sorted);
  }, [sortBy, sortOrder]);

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

  const handleAreaFilter = (checked) => {
    if (checked) {
      const lithuania = countries.filter(({ name }) => {
        return name == "Lithuania";
      });
      const [{ area: lithuaniaArea }] = lithuania;
      const areaFilter = countries.filter((country) => {
        return country.area < lithuaniaArea;
      });
      setFiltered(areaFilter);
    } else {
      setFiltered(countries);
    }
  };

  return (
    <Fragment>
      <Toolbar>
        <Search onSearch={handleSearch} />
      </Toolbar>
      <Toolbar className={classes.header}>
        <div className={classes.flex}>
          <Filter
            label={"Filter by region"}
            options={regions}
            onFilter={handleRegionFilter}
          />
          <div className={classes.filter}>
            <Filter
              label={"Smaller than Lithuania"}
              onFilter={handleAreaFilter}
              singleOption
            />
          </div>
        </div>
        <div className={classes.flex}>
          <Sort label="Sort by:" options={sortOptions} onSort={handleSortBy} />
          <IconButton onClick={handleSort}>
            <Icon>sort_by_alpha</Icon>
          </IconButton>
        </div>
      </Toolbar>
      {filtered.length > 0 ? (
        <List>
          {filtered.map((data, i) => {
            const { name, region, area, flag } = data;
            return (
              <Fragment key={i}>
                <ListItem
                  className={classes.countryListItem}
                  alignItems="flex-start"
                >
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

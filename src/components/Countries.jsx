import React, { useState, useEffect, Fragment } from "react";
import {
  Typography,
  Icon,
  IconButton,
  Toolbar,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { filterRegions } from "../api";
import {
  CountryList,
  CountryGrid,
  Filter,
  Pagination,
  Search,
  Sort,
  ToggleView,
} from ".";
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
    toggleView: {
      margin: `0 ${theme.spacing(2)}px`,
    },
  })
);

const Countries = ({ countries }) => {
  const classes = useStyles();

  const [filtered, setFiltered] = useState(countries);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("name");
  const [resetPagination, setResetPagination] = useState(false);
  const [view, setView] = useState("list");

  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "area", label: "Area" },
  ];

  const regions = [...new Set(countries.map((country) => country.region))];
  const regionFilterOptions = regions.map((region) => ({
    value: region,
    label: region,
  }));

  const areaFilterOptions = [
    { value: "lithuania", label: "Smaller than Lithuania" },
  ];

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
      setResetPagination(true);
    } else {
      setFiltered(countries);
    }
  };

  const handleRegionFilter = async (region) => {
    region.length
      ? (setFiltered(await filterRegions(region)), setResetPagination(true))
      : setFiltered(countries);
  };

  const handleAreaFilter = (e) => {
    if (e) {
      const country = countries.filter(({ name }) => {
        return name.toLowerCase() == e;
      });
      const [{ area: countryArea }] = country;
      const areaFilter = countries.filter((country) => {
        return country.area < countryArea;
      });
      setFiltered(areaFilter);
      setResetPagination(true);
    } else {
      setFiltered(countries);
    }
  };

  return (
    <Fragment>
      <Toolbar>
        <Search onSearch={handleSearch} />
        <div className={classes.toggleView}>
          <ToggleView onToggle={(e) => setView(e)} />
        </div>
      </Toolbar>
      <Toolbar className={classes.header}>
        <div className={classes.flex}>
          <Filter
            label={"Region"}
            options={regionFilterOptions}
            onFilter={handleRegionFilter}
          />
          <div className={classes.filter}>
            <Filter
              label={"Area"}
              options={areaFilterOptions}
              onFilter={handleAreaFilter}
            />
          </div>
        </div>
        <div className={classes.flex}>
          <Sort label="Sort by" options={sortOptions} onSort={handleSortBy} />
          <IconButton onClick={handleSort}>
            <Icon>sort_by_alpha</Icon>
          </IconButton>
        </div>
      </Toolbar>
      {filtered.length > 0 ? (
        <Pagination
          data={filtered}
          RenderComponent={view == "list" ? CountryList : CountryGrid}
          pageLimit={5}
          dataLimit={20}
          isFiltered={resetPagination}
        />
      ) : (
        <Typography align="center">No countries found</Typography>
      )}
    </Fragment>
  );
};

export default Countries;

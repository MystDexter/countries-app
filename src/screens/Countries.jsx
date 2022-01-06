import React, { useState, useEffect, Fragment } from "react";
import {
  Grid,
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
} from "../components";
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
    flexStart: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      "& > button": {
        [theme.breakpoints.down("xs")]: {
          flexGrow: 1,
        },
      },
    },
    flexEnd: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      "& > div": {
        [theme.breakpoints.down("xs")]: {
          flexGrow: 1,
          justifyContent: "flex-start",
        },
      },
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

  const handleSortOrder = () => {
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
        <Grid container spacing={1} style={{ paddingTop: 8 }}>
          <Grid item xs={12} sm={12} md={4} className={classes.header}>
            <Search label="Search for countries" onSearch={handleSearch} />
            <div className={classes.toggleView}>
              <ToggleView onToggle={(e) => setView(e)} />
            </div>
          </Grid>
          <Grid item xs={6} sm={6} md={4} className={classes.flexStart}>
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
          </Grid>
          <Grid item xs={6} sm={6} md={4} className={classes.flexEnd}>
            <Sort
              label="Sort by"
              options={sortOptions}
              onSortBy={handleSortBy}
              showSortDirection
              onSortOrder={handleSortOrder}
            />
          </Grid>
        </Grid>
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

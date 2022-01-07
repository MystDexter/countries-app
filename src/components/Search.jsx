import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  InputAdornment,
  TextField,
  Icon,
  makeStyles,
  createStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    searchInput: {
      width: "100%",
      maxWidth: "600px",
    },
  })
);

const Search = ({ label, onSearch }) => {
  const classes = useStyles();

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
    <Fragment>
      <TextField
        className={classes.searchInput}
        variant="outlined"
        size="small"
        label={label}
        onChange={(e) => {
          onSearch(e.target.value);
        }}
        onFocus={(e) => setIsSelected(true)}
        onBlur={(e) => setIsSelected(false)}
        InputProps={iconAdornment}
      />
    </Fragment>
  );
};

Search.propTypes = {
  label: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

export default Search;

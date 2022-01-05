import React from "react";
import {
  NativeSelect,
  Typography,
  makeStyles,
  createStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
    },
    label: {
      marginRight: theme.spacing(1),
    },
  })
);

const Sort = ({ label, options, onSort }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.label}>{label}</Typography>
      <NativeSelect disableUnderline onChange={(e) => onSort(e.target.value)}>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </NativeSelect>
    </div>
  );
};

export default Sort;

import React from "react";
import {
  Icon,
  IconButton,
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
      marginRight: theme.spacing(0.5),
    },
  })
);

const Sort = ({
  label,
  options,
  onSortBy = () => {},
  showSortDirection,
  onSortOrder = () => {},
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.label}>{label}</Typography>
      <NativeSelect disableUnderline onChange={(e) => onSortBy(e.target.value)}>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </NativeSelect>
      {Boolean(showSortDirection) ? (
        <IconButton size="small" onClick={onSortOrder}>
          <Icon>sort_by_alpha</Icon>
        </IconButton>
      ) : null}
    </div>
  );
};

export default Sort;

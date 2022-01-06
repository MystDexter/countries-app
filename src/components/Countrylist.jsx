import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Collapse,
  makeStyles,
  createStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    countryListItem: {
      paddingLeft: theme.spacing(1.5),
    },
  })
);

const CountryList = ({ data }) => {
  const classes = useStyles();

  return (
    <List className={classes.countryListItem}>
      {data.map((item, i) => {
        const { name, region, area, flag } = item;
        return (
          <Fragment key={i}>
            <ListItem
              component={Link}
              to={`/countries/${name}`}
              button
              alignItems="center"
            >
              <ListItemAvatar>
                <Avatar alt={`flag of ${name}`} src={flag} />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={<Typography variant="h6">{name}</Typography>}
                secondary={
                  <Fragment>
                    <Typography variant="body2">Region: {region}</Typography>
                    <Typography variant="body2">
                      Area Size: {area ? area.toLocaleString() : ""} km²
                    </Typography>
                  </Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
        );
      })}
    </List>
  );
};

export default CountryList;

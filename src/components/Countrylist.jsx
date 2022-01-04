import React, { Fragment } from "react";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
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
  );
};

export default CountryList;

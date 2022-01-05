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
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Avatar alt="flag" src={flag} />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={<Typography variant="h6">{name}</Typography>}
                secondary={
                  <Fragment>
                    <Typography variant="body2">Region: {region}</Typography>
                    <Typography variant="body2">
                      Area Size: {area} km²
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

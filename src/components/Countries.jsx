import React, { Fragment } from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core";

const Countries = ({ countryData }) => {
  return (
    <List sx={{ width: "100%" }}>
      {countryData.map((data, i) => {
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
  );
};

export default Countries;

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
  createStyles,
  CardActionArea,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2.5),
    },
  })
);

const CountryGrid = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.root}>
      {data.map((item, i) => {
        const { name, region, area, flag } = item;
        return (
          <Grid item xs={12} sm={4} md={3} key={i}>
            <Card>
              <CardActionArea component={Link} to={`/countries/${name}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={flag}
                  alt={`flag of ${name}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {name}
                  </Typography>
                  <Typography variant="body2">Region: {region}</Typography>
                  <Typography variant="body2">
                    Area Size: {area ? area.toLocaleString() : ""} km²
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

CountryGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CountryGrid;

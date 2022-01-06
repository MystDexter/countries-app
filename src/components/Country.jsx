import React, { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Icon,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  useTheme,
  makeStyles,
  createStyles,
  Collapse,
  Toolbar,
} from "@material-ui/core";

import { fetchCountry } from "../api";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: `calc(100vh - 0px)`,
    },
    top: {
      padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    },
    contentArea: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      flex: "1 0 auto",
      margin: `0 ${theme.spacing(2)}px`,
      [theme.breakpoints.down("xs")]: {
        margin: 0,
      },
    },
    collapseButton: {
      minWidth: 40,
      margin: 16,
    },
  })
);

const Country = () => {
  const classes = useStyles();

  const theme = useTheme();
  const { name } = useParams();
  const history = useNavigate();

  const [country, setCountry] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setCountry(await fetchCountry(name));
    };
    fetchAPI();
  }, [name]);

  return (
    <>
      <Grid container spacing={1} className={classes.top}>
        <Grid item xs={12} sm={12} md={12}>
          <Button onClick={() => history("/")} variant="text" edge="start">
            <Icon>arrow_left</Icon>
            Go back
          </Button>
        </Grid>
      </Grid>
      <Container className={classes.root} maxWidth={false}>
        {country.map((item, i) => {
          const {
            flag,
            name,
            nativeName,
            population,
            region,
            capital,
            currencies,
            languages,
            borders,
            area,
          } = item;

          return (
            <Grid key={i} container component={Paper}>
              <Grid item xs={12} sm={6} md={6}>
                <CardMedia
                  component="img"
                  image={flag}
                  alt={`flag of ${name}`}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box className={classes.contentArea}>
                  <CardContent>
                    <Typography paragraph variant="h4">
                      {name}
                    </Typography>

                    <Typography>
                      <b>Capital:</b> {capital}
                    </Typography>
                    <Typography>
                      <b>Population:</b> {population.toLocaleString()}
                    </Typography>
                    <Typography>
                      <b>Region:</b> {region}
                    </Typography>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <Typography>
                        <b>Currencies:</b>{" "}
                        {currencies ? currencies[0].name : ""}
                      </Typography>
                      <Typography>
                        <b>Languages:</b> {languages[0].name}{" "}
                      </Typography>
                      <Typography>
                        <b>Area Size:</b> {area ? area.toLocaleString() : ""}{" "}
                        km²
                      </Typography>
                      <Typography>
                        <b>Native Name:</b> {nativeName}
                      </Typography>
                      <Typography>
                        <b>Border Countries:</b>
                        {borders
                          ? borders.map((border) => {
                              return (
                                <Fragment key={border}>
                                  <span> {border}, </span>
                                </Fragment>
                              );
                            })
                          : ""}
                      </Typography>
                    </Collapse>
                  </CardContent>
                  <Button
                    aria-label="Show map"
                    onClick={handleExpandClick}
                    className={classes.collapseButton}
                    color="primary"
                  >
                    {expanded ? "Show less" : "Show more"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          );
        })}
      </Container>
    </>
  );
};

export default Country;

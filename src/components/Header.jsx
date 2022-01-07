import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  IconButton,
  Icon,
  Toolbar,
  Typography,
  createStyles,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    spaceBetween: {
      justifyContent: "space-between",
    },
  })
);

const Header = ({ onChangeMode }) => {
  const classes = useStyles();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    onChangeMode(dark);
  }, [dark]);

  const headerDisplay = () => {
    return (
      <Toolbar className={classes.spaceBetween}>
        <Typography variant="h6">COUNTRIES APP</Typography>
        <IconButton size="small" onClick={() => setDark(!dark)}>
          <Icon style={{ color: "yellow", fontSize: 32 }}>
            {dark ? "light_mode" : "dark_mode"}
          </Icon>
        </IconButton>
      </Toolbar>
    );
  };

  return (
    <header>
      <AppBar>{headerDisplay()}</AppBar>
      {/* Rendering a second Toolbar prevents content from hiding
      behind the app bar */}
      <Toolbar />
    </header>
  );
};

Header.propTypes = {
  onChangeMode: PropTypes.func,
};

export default Header;

import React, { useState, useEffect } from "react";
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
            {dark ? "dark_mode" : "light_mode"}
          </Icon>
        </IconButton>
      </Toolbar>
    );
  };

  return (
    <header>
      <AppBar enableColorOnDark>{headerDisplay()}</AppBar>
      {/* Rendering a second Toolbar prevents content from hiding
      behind the app bar */}
      <Toolbar />
    </header>
  );
};

export default Header;

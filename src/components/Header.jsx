import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Header = () => {
  const headerDisplay = () => {
    return (
      <Toolbar>
        <Typography variant="h6">COUNTRIES OF THE WORLD</Typography>
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

export default Header;

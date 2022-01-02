import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";

const Header = () => {
  const headerDisplay = () => {
    return <Toolbar>Country Data</Toolbar>;
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

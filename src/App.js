import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, Paper } from "@material-ui/core";

import { Countries, Country } from "./screens";
import { Header } from "./components";

function App() {
  const [dark, setDark] = useState(false);

  const theme = createTheme({
    typography: {
      fontFamily: "Poppins, sans- serif",
    },
    palette: {
      type: dark ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Paper elevation={0} style={{ height: "100%" }}>
          <Header onChangeMode={(e) => setDark(e)} />
          <Routes>
            <Route exact path="/" element={<Countries />} />
            <Route path="/countries/:name" element={<Country />} />
          </Routes>
        </Paper>
      </Router>
    </ThemeProvider>
  );
}

export default App;

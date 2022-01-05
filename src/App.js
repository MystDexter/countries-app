import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider, Paper } from "@material-ui/core";

import { Header, Countries } from "./components";
import { fetchCountryData } from "./api";

function App() {
  const [countryData, setCountryData] = useState([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountryData(await fetchCountryData());
    };
    fetchAPI();
  }, []);

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
      <Paper elevation={0}>
        <Header onChangeMode={(e) => setDark(e)} />
        <Countries countries={countryData} />
      </Paper>
    </ThemeProvider>
  );
}

export default App;

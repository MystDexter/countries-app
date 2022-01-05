import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core";

import { Header, Countries } from "./components";
import { fetchCountryData } from "./api";

function App() {
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountryData(await fetchCountryData());
    };
    fetchAPI();
  }, []);

  //create material UI theme
  const theme = createTheme({
    typography: {
      fontFamily: "Poppins, sans- serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Countries countries={countryData} />
    </ThemeProvider>
  );
}

export default App;

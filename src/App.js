import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, Paper } from "@material-ui/core";

import { Countries, Country } from "./screens";
import { Header } from "./components";
import { fetchAllCountries } from "./api";

function App() {
  const [countryData, setCountryData] = useState([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountryData(await fetchAllCountries());
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
      <Router>
        <>
          <Paper elevation={0}>
            <Header onChangeMode={(e) => setDark(e)} />
            <Routes>
              <Route
                exact
                path="/"
                element={<Countries countries={countryData} />}
              />

              {/* <Countries countries={countryData} /> */}
              {/* </Route> */}
              <Route path="/countries/:name" element={<Country />} />
            </Routes>
          </Paper>
        </>
      </Router>
    </ThemeProvider>
  );
}

export default App;

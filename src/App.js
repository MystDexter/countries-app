import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    setCountryData(initialData);
  }, [initialData]);

  return (
    <div>
      <Header />
      <Countries countryData={countryData} />
    </div>
  );
}

export default App;

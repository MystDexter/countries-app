import React, { useState, useEffect } from "react";
import { Countries } from "./components";
import { fetchCountryData } from "./api";

function App() {
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountryData(await fetchCountryData());
    };
    fetchAPI();
  }, []);

  return (
    <div>
      <Countries countryData={countryData} />
    </div>
  );
}

export default App;

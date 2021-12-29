import React, { useState, useEffect } from "react";
import { Header, Filter, Countries } from "./components";
import { fetchCountryData } from "./api";

function App() {
  const [countryData, setCountryData] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      setCountryData(await fetchCountryData());
    };
    fetchAPI();
  }, []);

  const handleSearch = (e) => {
    setFilterTerm(e);
  };

  const filteredCountries = countryData.filter(({ name, region }) => {
    const term = filterTerm.trim().toLowerCase();
    return (
      name.toLowerCase().indexOf(term) > -1 ||
      region.toLowerCase().indexOf(term) > -1
    );
  });

  return (
    <div>
      <Header />
      <Filter data={countryData} onFilter={handleSearch} />
      <Countries countryData={filteredCountries} />
    </div>
  );
}

export default App;

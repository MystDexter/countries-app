const url = "https://restcountries.com/v2/all?fields=name,region,area,flag";

export const fetchCountryData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const filterRegions = async (region) => {
  const url = `https://restcountries.com/v2/region/${region}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

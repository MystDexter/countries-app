const url = "https://restcountries.com/v2/all?fields=name,region,area,flag";

export const fetchCountryData = async () => {
  try {
    const response = await fetch(url);
    const countries = await response.json();
    return countries;
  } catch (error) {
    console.log(error);
  }
};

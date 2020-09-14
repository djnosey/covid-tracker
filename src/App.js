import React, {useState, useEffect} from 'react';
import './App.css';
import {MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core"
//https://disease.sh/v3/covid-19/countries


function App() {

  const  [countries, SetCountries] = useState([]);
  const [country, Setcountry] = useState("worldwide") ;

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2,
          }));
            SetCountries(countries);
      });
    }
    getCountriesData();
  }, []);

const onCountryChange = async (event) => {
  const countryCode = event.target.value;
  console.log("seeing the country code", countryCode )
  Setcountry(countryCode)
};



  return (
    <div className="app">
      
      <div className ="app__header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdwon">
          <Select
            variant ="outlined"
            onChange = {onCountryChange}
            value = {country} >
  <MenuItem value = "worldwide">Worldwide</MenuItem>
  {countries.map(country => <MenuItem value = {country.value}>{country.name}</MenuItem>)}

          </Select>
      </FormControl>

      </div>



    </div>
  );
}

export default App;

import React, {useEffect, useState} from 'react'
import axios from 'axios'


const DisplayCountry = ({country}) => {

  const [weather, setWeather] = useState('')

  const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital
    }
  

   useEffect(() => {
    axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        const apiResponse = response.data;
        console.log(apiResponse)
        console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
        setWeather(apiResponse)
      })
  }, [])
 
if(weather !== ''){
  return(
    <>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
      {country.languages.map(lan =>
        <li key={lan.name}>{lan.name}</li>
        )}
      </ul>
      <img width="200" src={country.flag} alt="flag"/>
      <h2>Weather in {country.capital}</h2>
      <div>
      <b>Temperature</b>{weather.current.temperature}
      </div>
      <img src={weather.current.weather_icons} alt="icon" />
      <div><b>Wind: </b>{weather.current.wind_speed} MPH direction {weather.current.wind_dir}</div>
    </>
  )
}
else {
  return(
    <>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
      {country.languages.map(lan =>
        <li key={lan.name}>{lan.name}</li>
        )}
      </ul>
      <img width="200" src={country.flag} alt="flag"/>
    </>
  )
}
}


const Display = ({countriesToShow, setNewFilter}) => {

  if(countriesToShow.length === 1){
    return (
      <>
        <DisplayCountry country={countriesToShow[0]} />
      </>
    )
  }

  else if(countriesToShow.length > 1 && countriesToShow.length < 11) {
    return(
      <>
      <ul>
        {countriesToShow.map(country => 
          <li key={country.name}>{country.name} <button onClick={() => setNewFilter(country.name)}>Show</button></li>
        )}
      </ul>
      </>
    )
  }
  else {
    return(
      <div>There are too many countries to display. Please narrow down your search.</div>
    )
  }
}



function App() {

  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [countries, setCountries] = useState([])


  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])


  
      

  const filter = () => {

  }

  const handleSearchChange = (event) => {
    setNewFilter(event.target.value)
  }

  useEffect(() => {
      if(newFilter === '') {
        setShowAll(showAll)
      }
      else if(showAll){
        setShowAll(!showAll)
      }
    }, [newFilter, showAll]);

  const countriesToShow = showAll
      ? countries
      : countries.filter(country => {
          const c = country.name.toUpperCase()
          
          const filter = newFilter.toUpperCase()
          return c.search(filter) !== -1
        })

  return (
    <form onSubmit={filter}>
    <div>
      Name: <input onChange={handleSearchChange} />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
    <Display countriesToShow={countriesToShow} setNewFilter={setNewFilter}/>
  </form>
  )
}

export default App;

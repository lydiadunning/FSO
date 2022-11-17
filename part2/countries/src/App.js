import axios from 'axios'
import { useEffect, useState } from 'react'

const countrySearch = (countries, searchTerm) => 
  countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))

const Country = ({ countryName, buttonHandler }) => {
 return (
  <>
    <p>
    <button id={countryName} onClick={buttonHandler}>Show</button>
    {countryName}</p>
  </>
 )
}

const WeatherInfo = ({ capital }) => {
  const [temp, setTemp] = useState('')
  const [pic, setPic] = useState('')
  const [wind, setWind] = useState('')

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=imperial&appid=${api_key}`).then(response => {
      setTemp(response.data.main.temp)
      setPic(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
      setWind(response.data.wind.speed)
    })
  }, [])
  return (
    <>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {temp}</p>
      <img src={pic}/>
      <p>Wind: {wind} m/s</p>
    </>
  )
}

const CountryInfo = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} />
      <WeatherInfo capital={country.capital} />
    </>
  )
}

const Response = ({ countryData, searchTerm, buttonHandler }) => {
  const filtered =  countrySearch(countryData, searchTerm)
  if (filtered.length == 1) {
    return <CountryInfo country={filtered[0]} />
  }
  const response = filtered.map(country => <Country key={country.cca2} countryName={country.name.common} buttonHandler={buttonHandler}/>)

  if (response.length > 10) {
    return (
      <>
        <p>Too many matches. Specify another filter</p>
      </>
    )
  } else if (response.length > 0) {
    return response
  } else {
    return (
      <>
        <p>No matching countries</p>
      </>
    )
  }

}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countryData, setCountryData] = useState([])  

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountryData(response.data)
    })
  }, [])



  const searchHandler = (event) => {
    setSearchTerm(event.target.value)
  }

  const buttonHandler = (event) => {
    setSearchTerm(event.target.id)
  }

  return (
    <div>
      <p>find countries <input value={searchTerm} onChange={searchHandler}/></p>
      <Response countryData={countryData} searchTerm={searchTerm} buttonHandler={buttonHandler} />
    </div>
  )
}

export default App
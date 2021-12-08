import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Language from './Language'


const api_key = process.env.REACT_APP_API_KEY

const Details = ({country,showResult})=>{
  let spokenLanguages = []
  for(let i in country.languages){
    spokenLanguages.push(country.languages[i])
  }
  const [temperature,setTemp] = useState()
  const[wind,setWind] = useState({
    speed: null,
    direction: null,
  })
  const [icon,setIcon] = useState('')
  let lat = country.capitalInfo.latlng[0]
  let lon = country.capitalInfo.latlng[1]

  useEffect(()=>
        axios
          .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`)
          .then(response=>{
            setTemp((response.data.current.temp-273).toPrecision(3));
            setWind({
              speed: (response.data.current.wind_speed*2.2).toPrecision(3),
              direction: response.data.current.wind_deg
            })
            setIcon(`http://openweathermap.org/img/wn/${response.data.current.weather[0].icon}@2x.png`)
          })
  ,[lat,lon])

  const directions = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"]
  let bearing = directions[(Math.round((wind.direction)/22.5))]
  console.log(bearing)
  return(
    <div style={{padding:'5px',width:'500px',border: '3px solid rgba(0, 0, 0, 0.15)'}}>
      <p><b>Capital:</b> {country.capital} </p>
      
      <p><b>Population:</b> {country.population}</p>
      
      <h3>Spoken Languages</h3>
      <ul>
        {spokenLanguages.map(language=>(
          <Language key={language} language={language}/>
        ))}
      </ul>
      <img alt='flag' style={{width:200,border: '3px solid rgba(0, 0, 0, 0.55)'}} src={country.flags.svg}/>
      <h2><b>Weather in {country.capital} </b> </h2>
      <p><b>Temperature:</b> {temperature} Celcius</p>
      <img src={icon} alt="weatherIcon" />
      <p><b>Wind: </b>{wind.speed} mph, direction {bearing}</p>
    </div>

  )
}

export default Details
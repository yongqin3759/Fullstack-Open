import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('') 


  const handleFilterChange =(e)=>{
    setFilter(e.target.value)
  }

  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all').then(response=>{
      setCountries(response.data)
    })
  },[])

  let countriesToShow = (filter === '') ? [] : countries.filter(country=>(country.name.common.toLowerCase().includes(filter.toLowerCase())));
  let prompt = ''

  if(countriesToShow.length >10){
    countriesToShow =[]
    prompt = 'Too many matches, specify another filter'
  }

  return (
    <div>
      <div>
        Find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      {countriesToShow.map(country=>(
        <Country key={country.name.common} country={country}/>
      ))}
      <h3>{prompt}</h3>
      
    </div>
  )
  
  
}

export default App

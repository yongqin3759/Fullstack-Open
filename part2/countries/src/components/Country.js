import React, { useState } from 'react'
import Details from './Details'

const Country = ({country})=>{
    const [showResult, setShowResult] = useState(false)
    const onClick = ()=>{
      setShowResult(!showResult)
    }
    return(
      <div> 
      <h2>{country.name.common} <button onClick={onClick}>show</button></h2>
      {showResult ? <Details showResult={showResult} country={country}/>: null} 
      </div>
    )
  }

  export default Country
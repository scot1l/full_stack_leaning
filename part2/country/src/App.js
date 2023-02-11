import React, { useState, useEffect } from 'react'
import countryService from './services/countryService'


const App = () => {

  const [ countries , setCountries ] = useState([])
  
  useEffect(() => 
    countryService.getAll()
      .then(allCountry => setCountries(allCountry))
  , [])

  return (
    <div>
      
    </div>
  )
}

export default App
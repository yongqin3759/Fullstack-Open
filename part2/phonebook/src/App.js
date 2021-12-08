import React, { useEffect, useState } from 'react'
import PhoneNumberList from './components/PhoneNumberList'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response=>{
        setPersons(response.data)
      })
  },[])
  
  const handleNewNameChange = (e) =>{
    setNewName(e.target.value)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(persons.filter(person=>(person.name === newName)).length >= 1){
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length+1,
    }
    setPersons(persons.concat(newPerson))
  }

  const handleNewNumberChange = (e)=>{
    setNewNumber(e.target.value)
  }

  const personsToShow = (filter==='')? persons : persons.filter(person=>person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleFilterChange = (e)=>{
    console.log()
    setFilter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter value={filter} onChange= {handleFilterChange}/>
      <form>
      <h2>Add a new</h2>
      <PersonForm type='name' value={newName} onChange = {handleNewNameChange}/>
      <PersonForm type='number' value={newNumber} onChange = {handleNewNumberChange}/>

        <div>
          <button type="submit" onClick = {handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PhoneNumberList persons={personsToShow}/>
    </div>
  )
}

export default App
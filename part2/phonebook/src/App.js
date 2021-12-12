import React, { useEffect, useState } from 'react'
import PhoneNumberList from './components/PhoneNumberList'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import phoneList from './services/phoneList'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({text:null,isGood:true})

  useEffect(()=>{
    phoneList
      .getAll()
      .then(initialPhoneList=>{
        setPersons(initialPhoneList)
      })
  },[])
  
  const handleNewNameChange = (e) =>{
    setNewName(e.target.value)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    const foundPerson = persons.find(person=>(person.name === newName))
    
    if(foundPerson && window.confirm('This person already exists, would you like to update their number?')){
        console.log(foundPerson)
        handleUpdate(foundPerson)
        
    }else{
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      phoneList.create(newPerson).then(res=>{
        if(res.usefulErrorMsg){
          handleNotification(false, res.usefulErrorMsg)
        }else{
          let newContact = res
          console.log(newContact)
          // Set state here so that Persons is rendered with id
          setPersons(persons.concat(newContact))
          handleNotification(true,`Added ${newContact.name}`)
        }
      })
    }
    
  }

  const handleNotification = (isGood, text)=>{
    setMessage({isGood: isGood, text: text})
      setTimeout(() => {
        setMessage({isGood:null,text:null})
      }, 5000)
  }

  const handleUpdate = (person) =>{
    const changedPerson = {...person, number: newNumber }
    console.log('here')
    phoneList
      .update(person.id, changedPerson)
      .then((res)=>{
        if(res.usefulErrorMsg){
          handleNotification(false,res.usefulErrorMsg)
        }else{
          setPersons(persons.map(person=> (person.id === changedPerson.id? changedPerson: person)))
          handleNotification(true,`Changed ${person.name}`)
        }
      })
  }

  const handleNewNumberChange = (e)=>{
    setNewNumber(e.target.value)
  }

  const personsToShow = (filter==='')? persons : persons.filter(person=>person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleFilterChange = (e)=>{
    setFilter(e.target.value)
  }

  const removePhoneNumber = (id)=>{
    const removedPerson = persons.filter(person=>person.id === id)[0]
    if(window.confirm(`Are you sure you want to delete ${removedPerson.name}`)){
      phoneList.remove(id,removedPerson)
        .then(()=>{
          setPersons(persons.filter(person => person.id !== removedPerson.id))
        })
        .catch(()=>{
          handleNotification(false,`${removedPerson.name} has already been removed from server`)
          setPersons(persons.filter(person => person.id !== removedPerson.id))
        })
    }
	}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification isGood={message.isGood} message={message.text} />
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
      <PhoneNumberList persons={personsToShow} onClick={removePhoneNumber}/>
    </div>
  )
}

export default App
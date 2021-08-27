import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import phoneService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState(null)



  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const isFound = persons.some(person => person.name === newName)

    if(!isFound) {
      const personObject = {
        name: newName,
        number: newNumber,
      }

       phoneService
        .create(personObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewNumber('')
          setNotification(
            `${personObject.name} has been added to the server`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          })
          .catch(error => {
            console.log(`error detection now`)
            setNotification(
            `${Object.values(error.response.data)}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          })
    }
    else if(window.confirm(`Do you want to change ${newName}'s number?`)) {
      const person = persons.find(person => person.name === newName)
      const personUpdated = {...person, number: newNumber}
      phoneService
        .update(personUpdated.id, personUpdated)
        .then(response => {
          setPersons(persons.map(person => person.id !== personUpdated.id ? person : response))
          setNotification(
            `${personUpdated.name} number has successfully been changed`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setNotification(
            `ERROR : ${personUpdated.name} was already removed from server`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== personUpdated.id))
      })
    }
  }

  const removePerson = (id) => {
    const search = persons.filter(person => person.id === id)
    const person = search[0]
    if(window.confirm(`Delete ${person.name}?`)) {
      phoneService
        .remove(id)
        setPersons(persons.filter(person => person.id !== id))
         setNotification(
            `${person.name} has successfully been removed from the server`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
    }
  }

 const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
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

  const contactsToShow = showAll
      ? persons
      : persons.filter(person => {
          const p = person.name.toUpperCase()
          const filter = newFilter.toUpperCase()
          console.log(filter)
          return p.search(filter) !== -1
        })

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />

      <Filter handleFilterChange={handleFilterChange} />

      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <People persons={contactsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App
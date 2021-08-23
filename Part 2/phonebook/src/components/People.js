import React from 'react'

const People = ({persons, removePerson}) => {
  return(
    <ul>
      {persons.map(person => 
        <li key={person.name}>{person.name}'s No: {person.number}<button onClick={() => removePerson(person.id)}>Delete</button></li>
      )}
    </ul>
  )
}

export default People
import React from 'react'

const PersonForm = ({addPerson, handleNameChange, handleNumberChange}) => (
  <form onSubmit={addPerson}>
    <div>
      Name: <input onChange={handleNameChange} />
    </div>
    <div>
      Number: <input onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
)

export default PersonForm
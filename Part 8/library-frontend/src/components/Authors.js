import React, {useState} from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useMutation, useQuery } from '@apollo/client'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [setBornTo, changeSetBornTo] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [  {query: ALL_AUTHORS } ],
    onError: (error) => {
      props.setError(error.graphQLErrors[0])
    }
  })

  if (!props.show) {
    return null
  }


  if (authors.loading)  {
    return <div>loading...</div>
  }

  const changeBirthYear = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo } })
    setName('') 
    changeSetBornTo(' ')
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set Birth Year</h2>
      <form onSubmit={changeBirthYear}>
        <select value={name} onChange={({target}) => setName(target.value)}>
          {authors.data.allAuthors.map(author =>  
            <option key={author.name}value={author.name}>{author.name}</option>
          )}
        </select>
        <input
          value={setBornTo}
          onChange={({target}) => changeSetBornTo(parseInt(target.value))} />
      <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Authors

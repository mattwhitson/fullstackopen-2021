import React from 'react'

const Filter = ({handleFilterChange}) => (
    <div>
          Filter: <input onChange={handleFilterChange} />
    </div>
  )

 export default Filter
import React from 'react'

const Notify = ({errorMessage}) => {
    if ( !errorMessage ) {
      return null
    }
    return (
      <div style={{color: 'red'}}>
      {errorMessage.message}
      </div>
    )
  }

export default Notify
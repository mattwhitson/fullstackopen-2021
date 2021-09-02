import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  else if(message.includes('Wrong')){
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  else {
    return (
      <div className="success">
        {message}
      </div>
    )
  }
}

export default Notification
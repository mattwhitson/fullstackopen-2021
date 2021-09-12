import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification === null) {
    return null
  }
  else if(notification.success.includes('error')){
    return (
      <div className="error">
        {notification.notification}
      </div>
    )
  }
  else {
    return (
      <div className="success">
        {notification.notification}
      </div>
    )
  }
}

export default Notification
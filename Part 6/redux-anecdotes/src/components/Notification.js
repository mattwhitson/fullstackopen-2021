import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => state.notifications)


  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(notification !== null) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  else return null
}

export default Notification
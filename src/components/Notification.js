import React from 'react'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  
  let className = 'notification'
  if (type === 'error') {
    className += ' error-notification'
  }
  if (type === 'success') {
    className += ' success-notification'
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification
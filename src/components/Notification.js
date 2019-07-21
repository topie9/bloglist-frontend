import React from 'react'
import PropTypes from 'prop-types'

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

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}

export default Notification
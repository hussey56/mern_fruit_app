import React from 'react'

const Alert = (props) => {
   
  return (
    props.Alert && <>
    <div className={`alert alert-${props.Alert.type} fixed-top`} role="alert">
        {props.Alert.message}
  </div>
  </>
  )
}

export default Alert

import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
  const error= useRouteError()
  return (
    <div>{error.status}{error.message}</div>
  )
}

export default Error
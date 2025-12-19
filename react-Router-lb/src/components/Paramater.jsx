import React from 'react'
import { useParams } from 'react-router-dom'

function Paramater() {
  const {userid} = useParams()
  return (
    <div>
      Your user id is : {userid}
    </div>
  )
}

export default Paramater

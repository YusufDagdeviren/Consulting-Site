import React from 'react'
import { useParams } from 'react-router-dom'
function Profile() {
  const {userid} = useParams();
  return (
    <div>Profile - {userid}</div>
  )
}

export default Profile
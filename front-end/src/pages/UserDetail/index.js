import React from 'react'
import { useParams } from 'react-router-dom'
function UserDetail() {
    const {userid} = useParams();
  return (
    <div>Userdetail-{userid}</div>
  )
}

export default UserDetail
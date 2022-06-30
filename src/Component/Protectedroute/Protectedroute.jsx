import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function Protectedroute({userData}) {
  return (
    <>
    {userData ? <Outlet/> : <Navigate to='/Login'/>}
    </>
  )
}

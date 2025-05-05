import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Dashboard/Navbar'

export default function DashBoard() {
  return (
    <div className='h-full overflow-hidden'>
        <Navbar />
        <div className='overflow-auto flex-1'>
            <Outlet />
        </div>
    </div>
  )
}

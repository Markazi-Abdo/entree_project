import { BoxesIcon, HomeIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='flex items-center justify-around  gap-7 w-full bg-primary p-3'>
        <button className='btn btn-square btn-primary'>
          <Link to="/dashboard/" className='flex flex-col items-center'>
            <HomeIcon />
            <span>Acceuil</span>
          </Link>
        </button>
        <button className='btn btn-square btn-primary'>
          <Link to="/dashboard/produits" className='flex flex-col items-center'>
            <BoxesIcon />
            <span>Stock</span>
          </Link>
        </button>
    </nav>
  )
}

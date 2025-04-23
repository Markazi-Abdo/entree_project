import { BoxesIcon, HomeIcon, LogOutIcon, LucideLogOut } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../../store/useStoreAuth'

export default function Navbar() {
  const { logout } = useAuthStore();
  return (
    <nav className='w-full bg-primary p-3'>
      <div className='flex items-center justify-around  gap-7 w-full -translate-x-3.5'>
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
        <button className='btn btn-square btn-primary' onClick={logout}>
          <i>
            <LucideLogOut />
          </i>
        </button>
      </div>
    </nav>
  )
}

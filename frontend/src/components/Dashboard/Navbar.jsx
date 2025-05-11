import { BoxesIcon, HomeIcon, LineChartIcon, LogOutIcon, LucideLogOut, School2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../../store/useStoreAuth'

export default function Navbar() {
  const { logout } = useAuthStore();
  return (
    <nav className='w-full bg-primary p-3'>
      <div className='flex items-center justify-around  gap-7 w-full'>
          <Link to="/dashboard" className='btn btn-square btn-primary rounded-lg'>
            <HomeIcon />
            <span>Acceuil</span>
          </Link>
          <Link to="produits" className='btn btn-square btn-primary rounded-lg'>
            <BoxesIcon />
            <span>Stock</span>
          </Link>
          <Link to="analytiques" className='btn btn-square btn-primary rounded-lg'>
            <LineChartIcon />
            <span>Analytiques</span>
          </Link>
          <Link to="ecole" className='btn btn-square btn-primary rounded-lg'>
            <School2Icon />
            <span>Ecoles</span>
          </Link>
        <button className='btn btn-square btn-primary rounded-xl' onClick={logout}>
          <i>
            <LucideLogOut />
          </i>
        </button>
      </div>
    </nav>
  )
}

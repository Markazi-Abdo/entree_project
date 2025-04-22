import React from 'react'
import LoginForm from '../../components/Auth/LoginForm'
import { Link } from 'react-router-dom'
import AuthDesign from '../../components/Auth/AuthDesign'

export default function Login() {
  return (
    <div className='flex  h-full items-center justify-center gap-4 w-full '>
      <div className='flex flex-col h-full items-center justify-center gap-5 w-[50%]'>
        <h1 className='capitalize font-bold text-4xl'>Creer votre Compte</h1>
        <LoginForm />
        <div >
          <span>Avez vouz déja un compte? <Link to="/signup"><span className='text-accent'>Enregistrez vous</span></Link></span>
        </div>
      </div>
      <AuthDesign />
    </div>
  )
}

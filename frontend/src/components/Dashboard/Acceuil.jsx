import React, { useEffect, useState } from 'react'
import useAuthStore from '../../store/useStoreAuth'

export default function Acceuil() {
  const { user, onlineUsers } = useAuthStore();
  const [ time, setTime ] = useState("");
  const padHours = (number) => {
    return number < 10 ? number = "0"+number : number
  }
  
  console.log(onlineUsers);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const formatHour = function() {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedHour = `${padHours(hour)}-${padHours(minutes)}-${padHours(seconds)}`;

    return formattedHour;
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      setTime(formatHour());
    }, 1000);

    return ()=> clearInterval(interval);
  }, [ formatHour ])
  
  return (
    <div className='flex flex-col justify-center items-center h-full overflow-hidden font-bold p-5 -translate-x-5'>
        <div className=' border border-primary rounded-xl text-center p-7 text-white bg-primary'>
          <h1 className='text-4xl text-center'> {new Date().getHours() < 12 ? `Bonjour ${user.nom}` : `Bonsoir ${user.nom}` }</h1>
          <time  className='text-2xl font-bold'>{time}</time>
        </div>
    </div>
  )
}

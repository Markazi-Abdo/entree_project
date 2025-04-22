import React, { useEffect } from 'react'
import useProductStore from '../../store/useProduitStore'
import { LucideLoaderCircle } from 'lucide-react';
import EntreeCard from '../Recycle/EntreeCard';
import SortieCard from '../Recycle/SortieCard';

export default function Sorties() {
  const { isLoading, sorties, getSorties } = useProductStore();

  useEffect(()=>{
    getSorties();
  }, [ getSorties ])

  if (isLoading) {
    return <LucideLoaderCircle className='animate-spin'/>
  }

  return (
    <div className='w-full flex flex-col gap-4 items-center justify-center'>
      <h1 className='text-4xl'>Sorties Enregistrés</h1>
      {
        sorties.map(item => {
          return <SortieCard 
                  key={item._id}
                  id={item._id}
                  article={item.article}
                />
        })
      }
    </div>
  )
}

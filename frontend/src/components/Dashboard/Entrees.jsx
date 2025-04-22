import React, { useEffect } from 'react'
import useProductStore from '../../store/useProduitStore'
import Loading from '../Loading';
import { LoaderCircleIcon } from 'lucide-react';
import EntreeCard from '../Recycle/EntreeCard';

export default function Entrees() {
  const { isLoading, entrees, getEntrees, deleteEntree, setSortie } = useProductStore();

  useEffect(()=>{
    getEntrees();
  }, [ getEntrees ])

  if (isLoading) {
    return <LoaderCircleIcon className='animate-spin' />
  }
  
  return (
    <div className='w-full flex justify-center items-center flex-col gap-4'>
      <h1 className='w-full text-center text-4xl'>Entrées Enregistrés</h1>
      {
        entrees?.map(item => {
          return <EntreeCard
                  key={item?._id}
                  id={item?.article?._id}
                  nom={item?.article?.nom}
                  article={item?.article}
                  quantite={item?.article?.quantite}
                  delFunc={deleteEntree}
                  />
        })
      }
    </div>
  )
}

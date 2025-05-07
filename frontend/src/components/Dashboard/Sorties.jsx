import React, { useEffect, useState } from 'react'
import useProductStore from '../../store/useProduitStore'
import { LucideLoaderCircle, Move3DIcon, MoveLeftIcon, MoveRightIcon, RecycleIcon, SearchIcon } from 'lucide-react';
import EntreeCard from '../Recycle/EntreeCard';
import SortieCard from '../Recycle/SortieCard';

export default function Sorties() {
  const { isLoading, sorties, getSorties } = useProductStore();
  const [ viewPerPage, setViewPerPage ] = useState(4);
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ search, setSearch ] = useState("");

  useEffect(()=>{
    getSorties();
  }, [ getSorties ])

  if (isLoading) {
    return <LucideLoaderCircle className='animate-spin'/>
  }

  const nextButton = () => {
    setCurrentIndex((prevIndex) => prevIndex + viewPerPage);
  }
  const prevButton = () => {
    setCurrentIndex((prevIndex) => prevIndex - viewPerPage);
  }

  const filtered = search ? sorties?.filter(item => 
    item?.article?.nom?.toLowerCase().includes(search.toLowerCase())
  ) : sorties;
  let ListOfSorties = filtered?.slice(currentIndex, currentIndex + viewPerPage);
  const isStart = currentIndex === 0;
  const isEnd = currentIndex >= filtered?.length - viewPerPage;

  return (
    <div className='w-full flex flex-col gap-4 items-center justify-center overflow-hidden'>
      <div className='flex items-center gap-4 w-full'>
        <h1 className='text-4xl'>Sorties Enregistrés</h1>
        <input 
        type="text" 
        className='input input-md input-bordered w-[400px] rounded-xl'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        placeholder='Cherchez Une Sortie'
        />
      </div>
      <div className='space-y-2 relative'>
        {
          ListOfSorties?.map(item => {
            return <SortieCard
                    key={item?._id}
                    id={item?._id}
                    articles={item?.articles}
                    quantite={item?.quantite}
                    createdAt={item?.createdAt}
                    to={item.to}
                  />
          })
        }
        <button className='btn btn-sm btn-square btn-primary rounded-lg' onClick={prevButton} disabled={isStart}>
          <MoveLeftIcon />
        </button>
        <button className='btn btn-sm btn-square btn-primary ml-5 rounded-lg' onClick={nextButton} disabled={isEnd}>
          <MoveRightIcon />
        </button>
      </div>
    </div>
  )
}

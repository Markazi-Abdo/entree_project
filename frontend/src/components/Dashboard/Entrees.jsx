import React, { useEffect, useState } from 'react'
import useProductStore from '../../store/useProduitStore'
import Loading from '../Loading';
import { LoaderCircleIcon, MoveLeftIcon, MoveRightIcon, RecycleIcon, SearchIcon } from 'lucide-react';
import EntreeCard from '../Recycle/EntreeCard';

export default function Entrees() {
  const { isLoading, entrees, getEntrees, deleteEntree, setSortie } = useProductStore();
  const [ viewPerPage, setViewPerPage ] = useState(4);
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ search, setSearch ] = useState("");
  
  useEffect(()=>{
    getEntrees();
  }, [ getEntrees ])

  if (isLoading) {
    return <LoaderCircleIcon className='animate-spin'/>
  }
   
  const nextButton = () => {
    setCurrentIndex((prevIndex) => prevIndex + viewPerPage);
  }

  const prevButton = () => {
    setCurrentIndex((prevIndex) => prevIndex - viewPerPage);
  }

  const filtered = search ? entrees?.filter(item =>
    item?.article?.nom?.toLowerCase().includes(search.toLowerCase())
  ) : entrees;
  let listOfEntrees = filtered?.slice(currentIndex, currentIndex + viewPerPage);
  const isStart = currentIndex === 0;
  const isEnd = currentIndex >= filtered?.length - viewPerPage;
  

  return (
    <div className='w-full flex justify-center items-center flex-col gap-4 h-full '>
      <div className='flex items-center gap-4 w-full'>
        <h1 className='text-center text-4xl'>Entrées Enregistrés</h1>
        <input 
        type="text" 
        className='input input-md input-bordered w-96 rounded-xl'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        placeholder='Cherchez Une Entrée'
        />
      </div>
      <div className='space-y-2 relative'>
        {
          listOfEntrees?.map(item => {
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

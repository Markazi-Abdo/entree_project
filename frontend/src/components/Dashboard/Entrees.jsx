import React, { useEffect, useState } from 'react'
import useProductStore from '../../store/useProduitStore'
import Loading from '../Loading';
import { LoaderCircleIcon, MoveLeftIcon, MoveRightIcon } from 'lucide-react';
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

  const isStart = currentIndex === 0;
  const isEnd = currentIndex >= entrees?.length - viewPerPage;
  let listOfEntrees = entrees?.splice(currentIndex, currentIndex + viewPerPage);

  const filterSearch = () => {
    listOfEntrees = entrees?.filter(item =>
      item?.toLowerCase().includes(search?.toLowerCase())
    )
    
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
    filterSearch()
  }

  return (
    <div className='w-full flex justify-center items-center flex-col gap-4 h-full '>
      <div className='flex items-center gap-4 w-full'>
        <h1 className='text-center text-4xl'>Entrées Enregistrés</h1>
        <input 
        type="text" 
        className='input input-md input-bordered w-3/6'
        value={search}
        onChange={handleChange}
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
        <button className='btn btn-sm btn-square btn-primary tooltip tooltip-left ' onClick={nextButton} disabled={isStart} data-tip="Arriére">
          <MoveLeftIcon />
        </button>
        <button className='btn btn-sm btn-square btn-primary ml-5 tooltip tooltip-right ' onClick={prevButton} disabled={isEnd} data-tip="Suivant">
          <MoveRightIcon />
        </button>
      </div>
    </div>
  )
}

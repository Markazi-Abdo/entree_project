import React, { useEffect, useState } from 'react'
import useProductStore from '../../store/useProduitStore'
import Loading from '../Loading';
import { ExternalLink, InfoIcon, LoaderCircleIcon, MoveLeftIcon, MoveRightIcon, RecycleIcon, SearchIcon, XIcon } from 'lucide-react';
import EntreeCard from '../Recycle/EntreeCard';
import SortieModal from './SortieModal';

export default function Entrees() {
  const { isLoading, entrees, getEntrees, deleteEntree, setSortie } = useProductStore();
  const [ checkedEntrees, setCheckedEntrees ] = useState([]);
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

  const onHandleCheckBoxFunc = (article) => {
    setCheckedEntrees((prev) => {
      const isChecked = prev.some(item => item._id === article._id);
      return isChecked ? prev.filter(item => item._id !== article._id) : [...prev, article];
    })
  }

  const clearArray = () => {
    setCheckedEntrees([]);
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
        className='input input-md input-bordered w-80 rounded-xl'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        placeholder='Cherchez Une Entrée'
        />
        {
          checkedEntrees.length > 0 &&
          <div className='flex items-center w-1/5 gap-2 transition-all'>
            <button className='btn btn-square btn-secondary w-1/3 rounded-xl cursor-default'>{checkedEntrees.length}</button>
            <button className='btn btn-square btn-secondary w-1/3 rounded-xl' onClick={() => document.getElementById("sorties_modal").showModal()}>
              <ExternalLink />
            </button>
            <button className='btn btn-square btn-secondary w-1/3 rounded-xl' onClick={clearArray}> 
              <XIcon />
            </button>
          </div>
        }
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
                    checkedEntrees={checkedEntrees}
                    handler={onHandleCheckBoxFunc}
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
      <SortieModal 
      articles={checkedEntrees}
      />
    </div>
  )
}

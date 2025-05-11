import React, { useEffect, useState } from 'react'
import { useSchoolStore } from "../../store/school";
import { ArrowBigLeftIcon, ArrowBigRightIcon, ArrowLeftFromLineIcon, PlusCircleIcon, SchoolIcon } from "lucide-react"
import SchoolCard from '../Recycle/SchoolCard';
import AddSchoolModal from './AddSchoolModal';

export default function Ecole() {
  const { isLoading, getSchools, addSchool, updateSchool, removeSchool, getInfo, schools } = useSchoolStore();
  const [ index, setIndex ] = useState(0);
  const [ viewPerPage, setViewPerPage ] = useState(4);
  const [ search, setSearch ] = useState("");

  useEffect(() => {
    getSchools();
  }, [ getSchools ])

  console.log(schools);
  
  const nextBtn = () => {
    setIndex((prev) => prev + viewPerPage);
  }

  const prevBtn = () => {
    setIndex((prev) => prev - viewPerPage);
  }

  const filtered = search ? schools?.filter(item => {
    return item?.nom?.toLowerCase().includes(search.toLowerCase());
  }) : schools;
  const ListOfSchools = filtered?.slice(index, index + viewPerPage);
  const isStart = index === 0;
  const isEnd = index >= schools.length - viewPerPage;


  return (
    <div className='h-full flex flex-col gap-4 items-center mt-5 -translate-x-5'>
      <h2 className='text-center font-bold text-2xl'>Ecoles Enregistées</h2>
      <div className='flex items-center gap-4'>
        <input 
        type="text" 
        className='input input-bordered input-sm rounded-xl w-[350px] transition-all'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        />
        <button className='btn btn-square btn-primary btn-sm rounded-xl' onClick={() => document.getElementById("add_school").showModal()}>
          <i><PlusCircleIcon /></i>
        </button>
      </div>
      <div className='max-w-[500px] mt-3 -translate-x-20'>
        {
          ListOfSchools.map(item => (
            <SchoolCard 
            key={item.codeGrise}
            data={item} 
            updateSchool={updateSchool}
            removeSchool={removeSchool}
            getInfo={getInfo}
            />
          ))
        }
      </div>
      <div className='flex w-[500px] justify-start gap-4'>
        <button className='btn btn-square btn-primary btn-sm rounded-xl' disabled={isStart} onClick={prevBtn}>
          <ArrowBigLeftIcon />
        </button>
        <button className='btn btn-square btn-primary btn-sm rounded-xl' disabled={isEnd} onClick={nextBtn}>
          <ArrowBigRightIcon />
        </button>
      </div>
      <AddSchoolModal />
    </div>
  )
}

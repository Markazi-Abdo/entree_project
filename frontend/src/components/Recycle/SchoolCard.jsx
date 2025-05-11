import { InfoIcon, PenSquareIcon, SchoolIcon, TrashIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import UpdateSchoolModal from '../Dashboard/UpdateSchoolModal'
import InfoModal from '../Dashboard/InfoModal'

export default function SchoolCard({ data, updateSchool, removeSchool, getInfo }) {
  return (
    <div className='flex justify-between items-center gap-2 border-2 border-slate-950 rounded-xl p-4 my-5 bg-primary text-white w-[700px]'>
        <div>
            <i><SchoolIcon /></i>
        </div>
        <div className='text-center'>
            <h2 className='font-bold'>{data.nom}</h2>
            <h3>Code Grise:{data.codeGrise}</h3>
        </div>
        <div className='flex flex-col'>
            <h3>Commune:{data.commune}</h3>
            <div className='flex justify-between items-center'>
                <i className='cursor-pointer' onClick={() => document.getElementById(`update_${data.codeGrise}`).showModal()}>
                    <PenSquareIcon />
                </i>
                <i className='cursor-pointer' onClick={() => removeSchool(data.codeGrise)}>
                    <TrashIcon />
                </i>
                <i className='cursor-pointer' onClick={() => document.getElementById(`info_${data.codeGrise}`).showModal()}>
                    <InfoIcon />
                </i>
            </div>
        </div>
        <UpdateSchoolModal 
        data={data}
        updateFunc={updateSchool}
        />
        <InfoModal 
        details={data}
        />
    </div>
  )
}

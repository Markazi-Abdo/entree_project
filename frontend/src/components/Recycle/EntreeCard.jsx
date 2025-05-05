import { ExternalLinkIcon, PenBoxIcon, Trash2Icon, UploadCloud } from 'lucide-react'
import React, { useState } from 'react'
import UpdateModal from '../Dashboard/UpdateModal'
import SortieModal from '../Dashboard/SortieModal'

export default function EntreeCard({ id, nom, quantite, delFunc, article, checkedEntrees, handler }) {
  return (
    <div className='border border-primary rounded-xl w-[850px] p-2 text-white bg-primary flex items-center'>
        <div className='w-1/6 flex justify-center'>
          <input type="checkbox"
          className='checkbox checkbox-sm outline outline-slate-950 border border-slate-950 rounded-sm transition'
          checked={checkedEntrees?.some(item => item._id === id)}
          onChange={()=>handler(article)}
          />
        </div>
        <div className='flex justify-between items-center w-full'>
          <div className='flex flex-col justify-center gap-3'>
              <h1>{nom}</h1>
              <p>{quantite}Qtes</p>
          </div>
          <div className='flex flex-col justify-center gap-3'>
              <span>Par Abdellatif Markazi</span>
              <div className='flex justify-center items-center gap-7'>
                <i className='cursor-pointer tooltip text-white ' data-tip="Modifier" onClick={()=>document.getElementById(`update_modal${article._id}`).showModal()}>
                    <PenBoxIcon className='size-6'/>
                </i>
                <i className='cursor-pointer tooltip text-error ' data-tip="Supprimer" onClick={()=>delFunc(id)}>
                    <Trash2Icon className='size-6'/>
                </i>
              </div>
          </div>
        </div>
        <UpdateModal 
        article={article}
        /> 
    </div>
  )
}

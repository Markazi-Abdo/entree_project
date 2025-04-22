import { ExternalLinkIcon, PenBoxIcon, Trash2Icon, UploadCloud } from 'lucide-react'
import React from 'react'
import UpdateModal from '../Dashboard/UpdateModal'
import SortieModal from '../Dashboard/SortieModal'

export default function EntreeCard({ id, nom, quantite, delFunc, article, sortieFunc }) {
  return (
    <div className='border border-primary rounded-xl w-[850px] p-2 text-white bg-primary flex justify-between items-center'>
        <div className='flex flex-col justify-center gap-3'>
            <h1>Nom:{nom}</h1>
            <p>{quantite}Qts</p>
        </div>
        <div className='flex flex-col justify-center gap-3'>
            <span>Par Abdellatif Markazi</span>
            <div className='flex justify-center items-center gap-7'>
              <i className='cursor-pointer tooltip text-white ' data-tip="Entregistrer Sortie" onClick={()=>document.getElementById(`sortie_modal${article._id}`).showModal()}>
                  <ExternalLinkIcon className='size-6'/>
              </i>
              <i className='cursor-pointer tooltip text-white ' data-tip="Modifier" onClick={()=>document.getElementById(`update_modal${article._id}`).showModal()}>
                  <PenBoxIcon className='size-6'/>
              </i>
              <i className='cursor-pointer tooltip text-error ' data-tip="Supprimer" onClick={()=>delFunc(id)}>
                  <Trash2Icon className='size-6'/>
              </i>
            </div>
        </div>
        <UpdateModal 
        article={article}
        /> 
        <SortieModal
        article={article}
        />
    </div>
  )
}

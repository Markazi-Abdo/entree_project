import { BoxesIcon, BoxIcon, Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'
import useProductStore from '../../store/useProduitStore'

export default function SortieModal({ article }) {
  console.log("My article: " + article._id);
  const { isLoading, setSortie } = useProductStore(); 
  const [ qu, setQu ] = useState(1);
  return (
    <dialog id={`sortie_modal${article._id}`} className='modal'>
        <div className='modal-box'>
            <h3 className='text-black text-center font-bold text-xl mb-5'>Sortie du {article?.nom} </h3>
            <div className='form-control gap-4'>
                <label htmlFor="quantite" className='flex justify-center items-center input input-md input-bordered font-bold gap-4'>
                    <BoxesIcon className="text-black"/>
                    <input 
                    type="number"
                    placeholder='Entrez la quanité de cette entrée'
                    name='quantite'
                    value={qu}
                    onChange={(e)=>setQu(e.target.value)}
                    className='w-full text-black'
                    />
                </label>
                <div className='modal-action flex items-center'>
                    <button type='submit' className='btn btn-square btn-primary w-5/6'
                    onClick={()=>setSortie(article, qu)}
                    >
                        {
                            isLoading ? <Loader2Icon className='animate-spin'/> : <span>Enregistrer sortie du {article?.nom}</span>
                        }
                    </button>
                    <form method="dialog" className='w-1/6'>
                        <button className='btn w-full'>
                            X
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </dialog>
  )
}

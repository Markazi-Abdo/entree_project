import { BoxesIcon, BoxIcon, Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'
import useProductStore from '../../store/useProduitStore'

export default function UpdateModal({ article }) {
  console.log("My article: " + article.nom + "why");
  const { isLoading, updateEntree } = useProductStore(); 
  const [ item, setItem ] = useState({ nom:article?.nom, quantite:article?.quantite });
  console.log("My Item: " + item.nom);
  const handleChange = function(e) {
    const { name, value } = e.target;

    setItem((prev) => ({
        ...prev,
        [name]:value
    }))
  }

  return (
    <dialog id={`update_modal${article._id}`} className='modal'>
        <div className='modal-box'>
            <h3 className='text-black text-center font-bold text-xl mb-5'>Modifier {article.nom} </h3>
            <div className='form-control gap-4'>
                <label htmlFor="nom" className='flex justify-center items-center input input-md input-bordered font-bold gap-4'>
                <BoxIcon className="text-black"/>
                <input 
                type="text" 
                placeholder='Entrez le nom des entrées'
                className='w-full text-black'
                name='nom'
                value={item?.nom}
                onChange={handleChange}
                />
                </label>
                <label htmlFor="quantite" className='flex justify-center items-center input input-md input-bordered font-bold gap-4'>
                    <BoxesIcon className="text-black"/>
                    <input 
                    type="number"
                    placeholder='Entrez la quanité de cette entrée'
                    name='quantite'
                    value={item?.quantite}
                    onChange={handleChange}
                    className='w-full text-black'
                    />
                </label>
                <div className='modal-action flex items-center'>
                    <button type='submit' className='btn btn-square btn-primary w-5/6'
                    onClick={()=>updateEntree(article?._id, item)}
                    >
                        {
                            isLoading ? <Loader2Icon className='animate-spin'/> : <span>Modifier {article?.nom}</span>
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

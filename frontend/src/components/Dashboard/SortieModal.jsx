import { BoxesIcon, BoxIcon, ExternalLinkIcon, Loader2Icon, XCircleIcon } from 'lucide-react';
import React, { useState } from 'react';
import useProductStore from '../../store/useProduitStore';
import CheckedEntreeCard from './CheckedEntreeCard';

export default function SortieModal({ articles }) {
  const { setSortie } = useProductStore();
  const [ sorties, setSorties ] = useState([]);
  
  const groupSortiesToOne = function(sortie) {
    setSorties((prev) => {
        const filtered = prev.filter(item => item.article._id !== sortie.article._id);
        return sortie.quantite > 0 ? [...filtered, sortie] : filtered;
    })
  }

  const makeSortie = async function() {
    await setSortie(sorties);
  }
  console.log(sorties);

  return (
    <dialog id={`sorties_modal`} className='modal'>
        <div className='modal-box rounded-3xl'>
            <form method='dialog' className='flex justify-between items-center mb-5'>
                <h2 className='font-bold text-2xl capitalize'>Enregistrez vos sorties</h2>
                <button className='btn btn-sm btn-square rounded-lg'>
                    <XCircleIcon />
                </button>
            </form>
            <div className='modal-middle flex flex-col items-start'>
                <div className='w-full overflow-scroll h-60'>
                    {
                        articles.map(item => (
                            <CheckedEntreeCard 
                            key={item?._id}
                            article={item}
                            groupFunc={groupSortiesToOne}
                            />
                        ))
                    }
                </div>
                <div className='mt-5 flex justify-center items-center gap-2 flex-wrap'>
                    {
                        articles.map(item => (
                            <div className='bg-neutral rounded-xl p-1.5 text-white'>
                                {item?.nom}
                            </div>
                        ))
                    }
                </div>
            </div>
            <select className='select select-md select-bordered rounded-xl my-5 w-full text-center'>
                <option selected disabled>Selectionnez une ecole</option>
            </select>
            <div className='modal-bottom'>
                <button className=' btn btn-md mt-5 btn-square btn-neutral w-full text-white font-bold text-center rounded-xl'
                onClick={()=>makeSortie()}
                >
                    <i><ExternalLinkIcon /></i><span>Enregistrez cette Sortie</span>
                </button>
            </div>
        </div>
    </dialog>
  )
}

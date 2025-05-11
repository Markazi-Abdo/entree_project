import { XIcon } from 'lucide-react'
import React from 'react'

export default function InfoModal({ details }) {
  console.log(details.sorties.length)  
  return (
    <dialog id={`info_${details?.codeGrise}`} className='modal text-black'>
       <div className='modal-box  rounded-3xl'>
            <div className='modal-top flex justify-between'>
                <h2>Sorties des {details.nom}</h2>
                <form method='dialog'>
                    <button>
                        <XIcon />
                    </button>
                </form>
            </div>
            <div className='modal-middle h-52 overflow-y-scroll'>
                {
                    details?.sorties?.map(item => (
                        item?.articles?.map(art => (
                            <div className='border-2 rounded-xl p-3 w-full'>
                                <div className='flex justify-between items-center'>
                                    <h2>Article:{art?.article?.nom}</h2>
                                    <h4>Qte:{art?.quantite}</h4>
                                </div>
                                <time datetime="">Le {item?.createdAt.split("T")[0]}</time>
                            </div>
                        ))
                    ))
                }
            </div>
       </div>
    </dialog>
  )
}

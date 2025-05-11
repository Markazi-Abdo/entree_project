import { BoxesIcon, BoxIcon, ExternalLinkIcon, Loader2Icon, PlusSquareIcon, XCircleIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import useProductStore from '../../store/useProduitStore';
import CheckedEntreeCard from './CheckedEntreeCard';
import AxiosInstance from '../../utils/axios';
import AddSchoolModal from './AddSchoolModal';
import { useSchoolStore } from '../../store/school';

export default function SortieModal({ articles }) {
  const { setSortie } = useProductStore();
  const [ to, setTo ] = useState("");
  const { isLoading, schools, getSchools } = useSchoolStore();
  const [ sorties, setSorties ] = useState([]);

  console.table(schools);
  console.log(to);

  useEffect(() => {
    getSchools();
  }, [ getSchools ])
  
  const groupSortiesToOne = function(sortie) {
    setSorties((prev) => {
        const filtered = prev.filter(item => item.article._id !== sortie.article._id);
        return sortie.quantite > 0 ? [...filtered, sortie] : filtered;
    })
  }

  const makeSortie = async function() {
    await setSortie(sorties, to);
  }
  
  

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
            <div className='w-full flex items-center gap-1.5'>
                <select className='select select-md select-bordered rounded-xl my-5 w-full text-center' value={to} onChange={(e) => setTo(e.target.value)}>
                    <option selected value={""}>Selectionnez une ecole</option>
                    {
                        schools.map(item => (
                            <option value={item?.codeGrise}>{item?.nom}</option>
                        ))
                    }
                </select>
                <button className='btn btn-square btn-primary rounded-xl' onClick={() => document.getElementById("add_school").showModal()}>
                    <PlusSquareIcon className='size-7'/>
                </button>
            </div>
            <div className='modal-bottom'>
                <button className=' btn btn-md mt-5 btn-square btn-neutral w-full text-white font-bold text-center rounded-xl'
                onClick={()=> makeSortie()}
                >
                    <i><ExternalLinkIcon /></i><span>Enregistrez cette Sortie</span>
                </button>
            </div>
        </div>
        <AddSchoolModal />
    </dialog>
  )
}

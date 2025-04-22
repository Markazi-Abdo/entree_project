import { BoxesIcon, BoxIcon } from 'lucide-react'
import React, { useState } from 'react'
import useProductStore from '../../store/useProduitStore';
import Loading from '../Loading';
import toast from 'react-hot-toast';

export default function Nouvelle() {
  const { isLoading, saveEntree } = useProductStore();
  const [entree, setEntree ] = useState({ nom:"", quantite:1 });  
  const hanldeChange = function(e){
    const { name, value } = e.target;

    setEntree((prev) => ({
        ...prev,
        [name]:value
    }))
  }

  const validateEntree = function() {
    console.log("F function 1")
    if (!Object.values(entree).every(value => typeof value === "number" ? value > 0 : value.trim() !== "")) {
      toast.error("Tous les champs doivent etre remplis ou supérieure du zero");
      return false;
    };
    return true;
  }
  const saveHandle = async function(e) {
    e.preventDefault();
    if (validateEntree()) {
      console.log("f funciton 2")
      await saveEntree(entree);
      toast.success("Entrée enregistré avec succés");
    }
  }

  return (
    <form className='border rounded-xl p-2 form-control gap-4 w-[700px] -translate-x-10 ' onSubmit={saveHandle}>
        <label htmlFor="nom" className='flex justify-center items-center input input-md input-bordered font-bold gap-4'>
            <BoxIcon />
            <input 
            type="text" 
            placeholder='Entrez le nom des entrées'
            className='w-full'
            name='nom'
            value={entree.nom}
            onChange={hanldeChange}
            />
        </label>
        <label htmlFor="quantite" className='flex justify-center items-center input input-md input-bordered font-bold gap-4'>
            <BoxesIcon />
            <input 
            type="number"
            placeholder='Entrez la quanité de cette entrée'
            name='quantite'
            value={entree.quantite}
            onChange={hanldeChange}
            className='w-full'
            />
        </label>
        <button type='submit' className='btn btn-square btn-primary w-full'>
            {
              isLoading ? <i><Loading /></i> : "Enregistrer"
            }
        </button>
    </form>
  )
}

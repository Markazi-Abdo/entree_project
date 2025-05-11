import { BookOpenIcon, BuildingIcon, CodeSquareIcon, PlusSquareIcon, School, XIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useSchoolStore } from '../../store/school';

export default function AddSchoolModal() {
  const [ schoolData, setSchoolData ] = useState({ nom:"", codeGrise:"", siecle:"", commune:"" });
  const { isLoading, addSchool } = useSchoolStore();
  const handleChange = function(e) {
    const { name, value } = e.target;

    setSchoolData((prev) => ({
        ...prev,
        [name]:value
    }))
  }

  const addFunc = async () => {
    await addSchool(schoolData);
  }

  return (
    <dialog id='add_school' className='modal rounded-full'>
        <div className='modal-box'>
            <form method='dialog' className='flex justify-between items-center'>
                <h3>Enregistrez une Ecole</h3>
                <button className="btn btn-sm btn-square rounded-lg">
                    <i><XIcon /></i>
                </button>
            </form>
            <div className='form-control mt-10 gap-4'>
                <label htmlFor="nom-ecole" className='flex gap-3 items-center input input-md input-bordered rounded-xl'>
                    <School />
                    <input 
                    type="text" 
                    placeholder='Ajouter Nom d ecole'
                    className='w-full'
                    name='nom'
                    value={schoolData.nom}
                    onChange={handleChange}
                    />
                </label>
                <label htmlFor="nom-ecole" className='flex gap-3 items-center input input-md input-bordered rounded-xl'>
                    <CodeSquareIcon />
                    <input 
                    type="text" 
                    placeholder='Ajouter Code Grise'
                    className='w-full'
                    pattern='[A-Z]{1}[0-9]{6}'
                    title='Le code doit contenir une lettre majuscule au debut et puis 6 nombres.'
                    name='codeGrise'
                    value={schoolData.codeGrise}
                    onChange={handleChange}
                    />
                </label>
                <label htmlFor="nom-ecole" className='flex gap-3 items-center input input-md input-bordered rounded-xl'>
                    <BuildingIcon />
                    <input 
                    type="text" 
                    placeholder='Ajouter Commune'
                    className='w-full'
                    name='commune'
                    value={schoolData.commune}
                    onChange={handleChange}
                    />
                </label>
                <label htmlFor="nom-ecole" className='flex gap-3 items-center input input-md input-bordered rounded-xl'>
                    <BookOpenIcon />
                    <input 
                    type="text" 
                    placeholder='Ajouter Siécle'
                    className='w-full'
                    name='siecle'
                    value={schoolData.siecle}
                    onChange={handleChange}
                    />
                </label>
                <button 
                onClick={() => addFunc()}
                className='flex justify-center items-center btn btn-sm w-full btn-square btn-primary rounded-xl'>
                    <PlusSquareIcon />
                    <span>Ajouter Ecole</span>
                </button>
            </div>
        </div>
    </dialog>
  )
}

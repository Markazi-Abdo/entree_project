import { EyeClosedIcon, EyeIcon, LoaderCircleIcon, LockIcon, MailIcon, User2Icon, UserPlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import useAuthStore from '../../store/useStoreAuth';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"

export default function SignupForm() {
  const [ data, setData ] = useState({ nom:"", email:"", motPasse:"", confirmPasse:"" });
  const [ showPassword, setShowPassword ] = useState(false);
  const [ showConfirmPass, setShowConfirmPass ] = useState(false);
  const { isLoading, signUp } = useAuthStore();
  const navigate = useNavigate();

  const handleDataChange = function(e) {
    const { name, value } = e.target;

    setData((prev) => ({
        ...prev,
        [name]:value
    }))
  }

  const validateData = function(){
        if (!Object.values(data).every(value => value && value.trim() !== "")) {
            toast.error("Tous les champs doivent etre remplis");
            return false;
        }

        if (data.motPasse.length < 6) {
            toast.error("Mot de Passe doit etre plus longs que 6 charactere");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d@$!%*?&/]{8,}$/;
        if (!emailRegex.test(data.email) || !passwordRegex.test(data.motPasse)) {
            toast.error("Format invalid d'email et mot de passe");
            return false;
        }

        if (data.confirmPasse !== data.motPasse) {
            toast.error("Votre mot de passe differe du confirmation, re-saisie");
            return false;
        }

        return true;
  }

  const handleSubmit = async function(e) {
    e.preventDefault();
    if (validateData()) {
        const { confirmPasse, ...userData } = data;
        await signUp(userData);
        navigate("/");
    }
  }

  return (
    <motion.div
    initial={{ opacity:0, y:-10 }}
    animate={{ opacity:1, y:20 }}
    transition={{ ease:"easeInOut", duration:0.8 }}
    >
        <form className='form-control space-y-10 w-[600px] mx-20  p-3 rounded-lg' onSubmit={handleSubmit}>
            <label htmlFor="nom" className='input input-md input-bordered flex items-center gap-2'>
                <span><User2Icon /></span>
                <input 
                type="text" 
                className='w-full'
                placeholder='Entrez Votre Nom Complet'
                name='nom'
                value={data.nom}
                onChange={handleDataChange}
                />
            </label>
            <label htmlFor="email" className='input input-md input-bordered flex items-center gap-2'>
                <span><MailIcon /></span>
                <input 
                type="email" 
                className='w-full'
                placeholder='Entrez Votre Nom Complet'
                name='email'
                value={data.email}
                onChange={handleDataChange}
                />
            </label>
            <label htmlFor="motPasse" className='input input-md input-bordered flex  items-center gap-2'>
                <span><LockIcon /></span>
                {
                    !showPassword ? (
                        <>
                            <input 
                            type="password" 
                            className='w-full'
                            placeholder='Entrez Votre Nom Complet'
                            name='motPasse'
                            value={data.password}
                            onChange={handleDataChange}
                            />
                            <button type="button"
                            onClick={()=>setShowPassword(!showPassword)}
                            >
                                {
                                    showPassword ? <EyeClosedIcon /> : <EyeIcon />
                                }
                            </button>
                        </>
                    ) : (
                        <>
                            <input 
                            type="text" 
                            className='w-full'
                            placeholder='Entrez Votre Nom Complet'
                            name='motPasse'
                            value={data.password}
                            onChange={handleDataChange}
                            />
                            <button type="button"
                            onClick={()=>setShowPassword(!showPassword)}
                            >
                                {
                                    showPassword ? <EyeClosedIcon /> : <EyeIcon />
                                }
                            </button>
                        </>
                    )
                }
            </label>
            <label htmlFor="confirmPasse" className='input input-md input-bordered flex items-center gap-2'>
                <span><LockIcon /></span>
                {
                    !showConfirmPass ? (
                        <>
                            <input 
                            type="password" 
                            className='w-full'
                            placeholder='Entrez Votre Nom Complet'
                            name='confirmPasse'
                            value={data.confirmPasse}
                            onChange={handleDataChange}
                            />
                            <button type="button"
                            onClick={()=>setShowConfirmPass(!showConfirmPass)}
                            >
                                {
                                    showConfirmPass ? <EyeClosedIcon /> : <EyeIcon />
                                }
                            </button>
                        </>
                    ) : (
                        <>
                            <input 
                            type="text" 
                            className='w-full'
                            placeholder='Entrez Votre Nom Complet'
                            name='confirmPasse'
                            value={data.confirmPasse}
                            onChange={handleDataChange}
                            />
                            <button type="button"
                            onClick={()=>setShowConfirmPass(!showConfirmPass)}
                            >
                                {
                                    showConfirmPass ? <EyeClosedIcon /> : <EyeIcon />
                                }
                            </button>
                        </>
                    )
                }
            </label>
            <button type='submit' className='btn btn-square btn-primary text-white flex items-center gap-2 w-full'>
                {
                    isLoading ?
                        <>
                        <LoaderCircleIcon className='animate-spin'/>
                        <span>Loading...</span>
                    </> : (
                        <>
                            <span>Enregistrer</span>
                            <i><UserPlusIcon /></i>
                        </>
                    )
                }
            </button>
        </form>
    </motion.div>
  )
}

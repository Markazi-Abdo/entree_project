import { ArrowBigDownDashIcon, ArrowBigUpDashIcon, MinusSquareIcon, PlusSquareIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'

export default function CheckedEntreeCard({ article, groupFunc }) {
  const [ number, setNumber ] = useState(0);
  const [ sortie, setSorties ] = useState({ article, quantite:0 });
    
  return (
    <div className='w-full bg-primary flex justify-between items-center text-white text-left border border-white shadow-white shadow-md rounded-3xl p-3'>
        <div className='flex flex-col'>
            <h3>{article?.nom}</h3>
            <h3>Qtes:{number < 0 ? article.quantite : article.quantite - number}</h3>
        </div>
        <div className='flex flex-col items-center'>
            <i className='cursor-pointer' onClick={() => {
                if (number >= 0 && number < article.quantite ) {
                   setNumber((prev) => prev + 1);
                   groupFunc({article, quantite:number + 1});
                }
            }}>
                <PlusSquareIcon className='size-6'/>
            </i>
            <p>{number < 0 ? setNumber(0) : number}</p>
            <i className='cursor-pointer' onClick={() => {
                if (number >= 0 ) {
                    setNumber((prev) => prev - 1);
                    groupFunc({article, quantite:number - 1});
                }            
            }}>
                <MinusSquareIcon className='size-6'/>
            </i>
        </div>
    </div>
  )
}

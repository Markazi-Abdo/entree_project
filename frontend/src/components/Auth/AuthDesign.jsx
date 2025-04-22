import React from 'react'

export default function AuthDesign() {
  return (
    <div className='flex items-center justify-center p-12 bg-base-200/40 h-screen w-full'>
        <div className='max-w-md text-center'>
            <div className='grid grid-cols-3 gap-3 p-5'>
                {
                    [...Array(9)].map((_,i) => (
                        <div 
                        key={i}
                        className={`aspect-square size-28 rounded-xl bg-slate-950/10 ${ i % 2  ? 'animate-pulse' : "" } `}
                        >
                            
                        </div>
                    ))
                }
            </div>
            <h2 className='font-bold text-xl capitalize mt-12'>Gérer ves entrées et sorties efficacement</h2>
        </div>
    </div>
  )
}

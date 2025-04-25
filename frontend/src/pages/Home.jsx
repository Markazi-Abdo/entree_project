import React from 'react'
import { ArrowBigRight, ArrowBigRightIcon, Inbox } from "lucide-react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
export default function Home() {
  return (
    <motion.div
    initial={{ opacity:0, y:-20}}
    animate={{ opacity:1,  y:0 }}
    transition={{ ease:"easeInOut", duration:0.8 }}
    >
        <main className='flex flex-col justify-center items-center h-screen container -translate-y-20 -translate-x-3 gap-6'>
            <div>
                <i className='font-bold size-24'>
                    <Inbox className='font-bold size-24 animate-pulse'/>
                </i>
            </div>
            <h1 className='capitalize text-4xl text-slate-950 font-bold'>Gérer les entrees de vos materiels efficacement</h1>
            <Link className='btn btn-square bg-primary flex items-center w-1/3 text-white transition hover:-translate-y-0.5' to="/dashboard">
                    <span>Allez-y</span>
                    <i><ArrowBigRightIcon /></i>
            </Link> 
        </main>
    </motion.div>
  )
}

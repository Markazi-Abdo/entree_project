import React, { useEffect, useState } from 'react'
import { useAnalyticsStore } from '../../store/useAnalytics'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts"
import { LoaderPinwheelIcon } from 'lucide-react';
import EntreeChart from './EntreeChart';
import SortieChart from './SortieChart';

export default function Analytiques() {
  const { isLoading, getData, data } = useAnalyticsStore();
  const [ type, setType ] = useState("entree");

  useEffect(()=>{
    getData();
  }, [ getData ])

  if (isLoading) {
    return <LoaderPinwheelIcon className="animate-spin"/>
  }

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='flex justify-center items-center gap-5 capitalize z-50'>
          <h1>Total des admins:  { data?.analytics?.data?.users }</h1>
          <h1>Total des entrees: { data?.analytics?.data?.histoires?.entree }</h1>
          <h1>Total des sorties: { data?.analytics?.data?.histoires?.sortie }</h1>
          <select name="type" id="type" className="select select-sm select-bordered"
          value={type}
          onChange={(e)=>setType(e.target.value)}
          >
            <option value="" disabled>Selectionnez Votre coix d'analytiques</option>
            <option value="entree">Voir Les Entrees</option>
            <option value="sortie">Voir Les Sorties</option>
          </select>
      </div>
      <div className='overflow-hidden'>
        {
          type === "entree" && (
              <EntreeChart data={data}/>
          )
        }
        {
          type === "sortie" && (
              <SortieChart data={data}/>
          )
        }
      </div>
    </div>
  )
}

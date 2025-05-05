import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import { useAnalyticsStore } from '../../store/useAnalytics';

export default function SortieChart({data}) {
  const { downloadExcelSortie } = useAnalyticsStore();
  console.log(data)  
  return (
    <div className='w-[950px] h-full border-2 rounded-xl mt-3 p-2 overflow-hidden'>
      <button 
      onClick={()=>downloadExcelSortie(data?.sortieAnalytics)}
      className='btn btn-square btn-primary'>
        Export Excel
      </button>
          <ResponsiveContainer height={350} width={"100%"}>
              <LineChart data={data?.sortieAnalytics || []}>
                <CartesianGrid stroke="#E3F2FD" strokeDasharray="5 5"/>
                <XAxis dataKey={"date"} stroke="#90CAF9"/>
                <YAxis yAxisId={"left"} stroke="#90CAF9"/>
                <Tooltip />
                <Legend />
                <Line 
                yAxisId={"left"}
                type={"monotone"}
                dataKey={"history"}
                stroke="#1E88E5"
                activeDot={{ r:8, fill:"#1565C0" }}
                name='Sortie'
                />
              </LineChart>
          </ResponsiveContainer>
      </div>
  )
}

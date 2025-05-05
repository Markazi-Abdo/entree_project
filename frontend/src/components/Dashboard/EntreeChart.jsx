import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import { useAnalyticsStore } from '../../store/useAnalytics';

export default function EntreeChart({data}) {
  const { downloadExcelEntree } = useAnalyticsStore();
  
  return (
    <div className='w-[950px] h-full border-2 rounded-xl mt-3 p-2 overflow-hidden'>
          <button 
          onClick={() => downloadExcelEntree(data?.entreeAnalytics)}
          className='btn btn-square btn-primary w-full rounded-xl'>Export Excle</button>
          <ResponsiveContainer height={350} width={"100%"}>
              <LineChart data={data?.entreeAnalytics || []}>
                <CartesianGrid stroke="#E3F2FD" strokeDasharray="20 20"/>
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
                name='Entree'
                />
              </LineChart>
          </ResponsiveContainer>
      </div>
  )
}

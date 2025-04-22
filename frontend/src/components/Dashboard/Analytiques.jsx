import React, { useEffect } from 'react'
import { useAnalyticsStore } from '../../store/useAnalytics'

export default function Analytiques() {
  const { isLoading, getData, data } = useAnalyticsStore();

  useEffect(()=>{
    getData();
  }, [ getData ])

  console.log(data);
  return (
    <div>Analytiques</div>
  )
}

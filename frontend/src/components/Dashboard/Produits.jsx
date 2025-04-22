import React, { useState } from 'react'
import { tabs } from "../../constants/tabnav";
import Tabs from './Tabs';
import Entrees from './Entrees';
import Nouvelle from './Nouvelle';
import Sorties from './Sorties';
import Analytiques from './Analytiques';

export default function Produits() {
  const [ currentTab, setCurrentTab ] = useState("Entrées"); 
  
  const changeCurrentTab = (tab) => {
    setCurrentTab(tab);
  }

  return (
    <main className='flex flex-col justify-center items-center gap-10 w-full h-full -translate-y-52'>
        <div className='flex justify-center items-center h-56 gap-4 w-full -translate-x-10 translate-y-20'>
            {
                tabs.map(item => {
                    return(
                        <Tabs
                        key={item.id}
                        title={item.title}
                        icon={item.icon}
                        func={changeCurrentTab}
                        />
                    )
                })
            }
        </div>
        <div>
            {
                currentTab === "Entrées" && <Entrees />
            }
            {
                currentTab === "NouvelleEntrée" && <Nouvelle />
            }
            {
                currentTab === "Sorties" && <Sorties />
            }
            {
                currentTab === "Analytiques" && <Analytiques />
            }
        </div>
    </main>
  )
}

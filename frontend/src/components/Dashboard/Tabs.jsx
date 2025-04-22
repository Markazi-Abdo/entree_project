

export default function Tabs({ title, icon, func}) {
  return (
    <div 
    onClick={()=>func(title)}
    className="border border-primary text-white bg-primary w-64 p-10 shadow-sm translate-x-7 shadow-primary rounded-xl flex items-center justify-between cursor-pointer transition hover:bg-primary/90 focus:scale-110">
        <h2>{title}</h2>
        <i>
            {icon}
        </i>
    </div>
  )
}

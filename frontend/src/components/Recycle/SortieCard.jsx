import { Trash2Icon } from "lucide-react";

export default function SortieCard({ id, articles, delFunc, createdAt, to }) {
  console.log(to?.nom);
    return (
      <div className='border border-primary rounded-xl w-[850px] p-2 text-white bg-primary flex justify-between items-center'>
          <div className='flex flex-col justify-center gap-3'>
              <h1>
                {
                  articles?.map(item => (
                    <div className="h-4">
                      <p>{item?.article?.nom} QTe°{item?.quantite}</p>
                    </div>
                  ))
                }
              </h1>
              <p>{`${new Date(createdAt).getFullYear() - 1}/${new Date(createdAt).getFullYear()}`}</p>
          </div>
          <div className='flex flex-col justify-center gap-3'>
              <span>A {to?.nom}</span>
              <div className='flex justify-center items-center gap-7'>
                <i className='cursor-pointer tooltip text-error ' data-tip="Supprimer">
                    <Trash2Icon className='size-6' onClick={()=>delFunc(id)}/>
                </i>
              </div>
          </div>
      </div>
    )
  }
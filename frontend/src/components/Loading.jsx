import { LoaderCircleIcon } from "lucide-react";


export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full -translate-y-12">
        <i>
            <LoaderCircleIcon className="animate-spin"/>
        </i>
    </div>
  )
}

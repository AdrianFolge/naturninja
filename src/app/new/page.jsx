"use client"
import NewMap from '@/components/NewMap'
import SubmitForm from "@/components/Submit"

function New() {
  return (
    <div className="max-w-6xl mx-auto space-y-4 p-4 grid grid-cols-2">
        <div>
            <SubmitForm />
        </div>
        <div>
            <NewMap/>
        </div>
    </div>
  )
}

export default New
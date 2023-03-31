import React from 'react'
import NewMap from '@/components/NewMap'
import FindCard from "@/components/FindCard"
import { client } from '../../../lib/client';


export default async function page() {
    const query = '*[_type == "hikes"]';
    const dbHikes  = await client.fetch(query);
    
    return (
        <div className='max-w-6xl mx-auto py-4 grid grid-cols-2 space-x-3'>
            <div className='max-h-screen overflow-y-auto mx-2'>
            {dbHikes.map((result) => (
                <FindCard key={result.id} result={result} />
            ))}
            </div>
            <div className='h-screen'>
                <NewMap mapData={dbHikes}/>
            </div>
        </div>
    )
}


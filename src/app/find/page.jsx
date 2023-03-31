"use client"
import React, { useState, useEffect } from 'react'
import NewMap from '@/components/NewMap'
import FindCard from "@/components/FindCard"
import { client } from '../../../lib/client';
import MapDB from "@/components/MapNoDB";

export default function Page() {
  const [query, setQuery] = useState('*[_type == "hikes"]');
  const [dbHikes, setDbHikes] = useState([]);
  const [search, setSearch] = useState("");

  const coords = {
    latitude: 37.773972,
    longitude: -122.431297
  }
  useEffect(() => {
    const fetchData = async () => {
      const result = await client.fetch(query);
      setDbHikes(result);
    };
    fetchData();
  }, [query]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!search) return;
    //router.push(`/search/${search}`);
    setQuery(`*[_type == "hikes" && city == "${search}"]`);
  }

  return (
    <div className='max-w-6xl mx-auto py-4'>
        <form
            onSubmit={handleSubmit}
            className="flex max-w-6xl mx-auto justify-between items-center px-5"
            >
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search keywords..."
                className="w-full h-14 rounded-sm placeholder-gary-500 outline-none bg-transparent flex-1"
            />
            <button
                disabled={!search}
                type="submit"
                className="text-amber-600 disabled:text-gray-400"
            >
                Search
            </button>
        </form>
        <div className='grid grid-cols-2 space-x-3'>
      <div className='max-h-screen overflow-y-auto mx-2'>
        {dbHikes.length > 0 ? (
          dbHikes.map((result) => (
            <FindCard key={result.id} result={result} />
          ))
          
        ) : (
          <p>Seems like there are no hikes...</p>
        )}
      </div>
        {dbHikes.length > 0 ? (
            <div className='h-screen'>
            <NewMap mapData={dbHikes} />
            </div>
      ): (
        <div className='h-screen'>
            <MapDB coords={coords} />
        </div>
      )}
      </div>

    </div>
  );
}
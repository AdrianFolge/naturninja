"use client"

import Map from "./Map";
import Results from "./Results";

import React, {useState} from 'react'

function FrontPageComp({dbHikes}) {
    const [value, setValue] = useState(5000);
    const [filteredArray, setFilteredArray] = useState(dbHikes)

    const handleChange = (event) => {
      setValue(event.target.value);
      setFilteredArray(dbHikes.filter((obj) => obj.length >= value))
    }
    return (
        <div>
        <div className='max-w-6xl mx-auto space-y-4 p-4'>
            <div>
                <input
                    type="range"
                    min="0"
                    max="10000"
                    value={value}
                    onChange={handleChange}
                />
                <p>Value: {value}</p>
            </div>
            <Map mapData={filteredArray}/>
        </div>
        <Results results={filteredArray} />
        </div>
    )
}

export default FrontPageComp
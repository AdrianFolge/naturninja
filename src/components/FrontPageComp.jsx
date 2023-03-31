"use client"

import Map from "./Map";
import Results from "./Results";

function FrontPageComp({dbHikes}) {
    return (
        <div>
        <div className='max-w-6xl mx-auto space-y-4 p-4'>
            <Map mapData={dbHikes}/>
        </div>
            <Results results={dbHikes} />
        </div>
    )
}

export default FrontPageComp
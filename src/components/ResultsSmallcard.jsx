import React from 'react'
import Results from './Results'
import Smallcard from './Smallcard';

export default function ResultsSmallcard({results}) {
    return (
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-6xl mx-auto py-4">
          {results.map((result) => (
            <Smallcard key={result.id} result={result} />
          ))}
        </div>
      );
}

import React from 'react';
import Comment from './Comment';
import SubmitComment from './SubmitComment';
import { client } from '../../lib/client';

export default async function CommentSection({hikeID}) {
    const query = `*[_type == "comment" && hike_id == "${hikeID}"]`;
    const results  = await client.fetch(query);
    console.log(results)
    return (
    <div>
        <div className="border-2 border-gray-300 rounded-md p-4 max-h-64 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Comments</h2>
        {results.length > 0 ? (results.map((result) => (
            <Comment key={result._id} result={result} />
        ))) : (<p>No comments yet</p>)}
        </div>
        <div className="border-2 border-gray-300 rounded-md p-4">
            <SubmitComment hike_id={hikeID} />
        </div>
    </div>
  );
};


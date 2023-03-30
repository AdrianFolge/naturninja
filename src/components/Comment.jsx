import React from 'react'

function Comment({result}) {
    const date = result._createdAt.slice(0, 10)
    return (
        <div className="border-t-2 border-gray-300 py-4">
            <h3 className="text-lg font-semibold mb-2">{result.user}</h3>
            <p className="text-gray-500 mb-2">{date}</p>
            <p className="text-gray-800">{result.content}</p>
        </div>
    )
}

export default Comment
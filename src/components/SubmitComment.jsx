"use client"
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { client } from '../../lib/client';

const SubmitComment = ({ hike_id }) => {
    const { data: session } = useSession()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const doc = {
            _type: "comment",
            content: comment,
            user: session.user.email,
            hike_id: hike_id,
        };
        client.create(doc).then(res => {
            console.log(`Hike was created, document ID is ${res._id}`)
        })
        console.log(doc);
        setName('');
        setEmail('');
        setComment('');
    };
    console.log(comment)
    return (
        <div className="border-t-2 border-gray-300 py-4">
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="name">Make a comment</label>
            <textarea className="w-full border-2 border-gray-300 p-2 rounded-md" id="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" type="submit">Submit</button>
        </form>
        </div>
    );
    };

export default SubmitComment;
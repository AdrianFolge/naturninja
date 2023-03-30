"use client"
import React, {useEffect, useState} from 'react'
import { useSession } from 'next-auth/react'
import Results from './Results'


function UserResults({results}) {
    const { data: session } = useSession() 
    if (session) {
        //console.log(emailSession || 0)
        const mailResults = results.filter(item => item.mail === session.user.email)
        return (
            <div>
            {mailResults.length > 0 ? (
              <Results results={mailResults} />
            ) : (
              <p>empty</p>
            )}
          </div>
        )
    }

    return (
        <div>
          <p>empty</p>
        </div>
    )
}

export default UserResults
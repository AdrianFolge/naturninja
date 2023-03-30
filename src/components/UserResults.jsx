"use client"
import React, {useEffect, useState} from 'react'
import { useSession } from 'next-auth/react'
import Results from './Results'


function UserResults({results}) {
    const { data: session } = useSession()
    const [emailSession, setEmailSession] = useState(0)
    const [mailResults, setMailResults] = useState([])
    useEffect(() => {
        setEmailSession(session)
        if (emailSession) {
            //console.log(emailSession || 0)
            setMailResults(results.filter(item => item.mail === emailSession.user.email))
        }
    })
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

export default UserResults
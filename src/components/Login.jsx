'use client';
import {VscSignOut, VscSignIn} from "react-icons/vsc"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Login() {
  const { data: session } = useSession()
  if (session) {
    const name = session.user.email.split('.')[0].toUpperCase()
    return (
      <div className="flex space-x-2">
        <div className="invisible md:visible">Hei, {name} <br /></div>
        <button onClick={() => signOut()}>< VscSignOut className="hover:text-amber-500"/></button>
      </div>
    )
  }
  return (
    <>
      <button onClick={() => signIn()}><VscSignIn className="hover:text-amber-500"/></button>
    </>
  )
}
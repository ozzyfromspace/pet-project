"use client"

import { signOut } from "next-auth/react"

const LogoutButton = () => {
  return (
    <span className="m-0 w-fit p-0" onClick={() => signOut()}>
      Log out
    </span>
  )
}

export default LogoutButton

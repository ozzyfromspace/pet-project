"use client"

import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

const LogoutButton = () => {
  return (
    <Button variant="ghost" className="m-0 w-fit p-0" onClick={() => signOut()}>
      Log out
    </Button>
  )
}

export default LogoutButton

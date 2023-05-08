"use client"

import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

const TestLogout = () => {
  return (
    <Button variant="destructive" className="w-fit" onClick={() => signOut()}>
      Logout
    </Button>
  )
}

export default TestLogout

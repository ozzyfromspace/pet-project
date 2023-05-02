"use client"

import { ReactNode } from "react"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

interface AuthProviderProps {
  session: undefined | null | Session
  children: ReactNode
}

const AuthProvider = (props: AuthProviderProps) => {
  const { children, session } = props

  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default AuthProvider

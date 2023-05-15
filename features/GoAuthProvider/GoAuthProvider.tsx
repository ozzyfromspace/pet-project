"use client"

import { ReactNode, createContext, useCallback, useContext } from "react"

export type GoAuthContextValue = {
  gofetch: (
    relativePath: string,
    init?: RequestInit | undefined
  ) => Promise<Response>
}

const GoAuthContext = createContext<GoAuthContextValue | undefined>(undefined)

type GoAuthProviderProps = {
  cookie: string
  children?: ReactNode
}

const GoAuthProvider = (props: GoAuthProviderProps) => {
  const { children, cookie } = props

  // relativePath must start with '/'
  const gofetch = useCallback(
    async (relativePath: string, init?: RequestInit | undefined) => {
      const GO_SERVER_URL =
        process.env["NEXT_PUBLIC_GO_SERVER_URL"] ||
        "http://no-go-server-url-was-provided"

      const authorizedInit = {
        headers: {
          Authorization: `__next-auth-token__ ${cookie}`,
        },
        ...init,
      }

      return fetch(`${GO_SERVER_URL}/api/v1${relativePath}`, authorizedInit)
    },
    [cookie]
  )

  return (
    <GoAuthContext.Provider value={{ gofetch }}>
      {children}
    </GoAuthContext.Provider>
  )
}

export const useGoFetch = () => {
  const goAuthContextValue = useContext(GoAuthContext)
  if (goAuthContextValue === undefined)
    throw new Error("no associated GoAuthProvider found")
  return goAuthContextValue
}

export default GoAuthProvider

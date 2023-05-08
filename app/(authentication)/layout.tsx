import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { getSession } from "@/features/AuthProvider"

import isSessionValid from "../isSessionValid"
import AuthHeader from "./AuthHeader"

interface Props {
  children?: ReactNode
}

const Layout = async (props: Props) => {
  const { children } = props

  const session = await getSession()

  if (isSessionValid(session)) {
    redirect("/")
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-start px-3 sm:px-5 md:px-7 lg:px-10 xl:px-8 2xl:px-12">
      <AuthHeader />
      <div className="my-8 h-full w-full flex-1">{children}</div>
    </div>
  )
}

export default Layout

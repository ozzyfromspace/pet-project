import { ReactNode } from "react"

import AuthHeader from "./AuthHeader"

interface Props {
  children?: ReactNode
}

const Layout = (props: Props) => {
  const { children } = props

  return (
    <div className="flex min-h-screen max-w-7xl flex-col items-center justify-start px-3 sm:px-5 md:px-7 lg:px-10 xl:px-8 2xl:px-12">
      <AuthHeader />
      <div className="my-8 h-full w-full flex-1">{children}</div>
    </div>
  )
}

export default Layout

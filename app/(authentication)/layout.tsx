import { ReactNode } from "react"

import AuthHeader from "./AuthHeader"

interface Props {
  children?: ReactNode
}

const Layout = async (props: Props) => {
  const { children } = props

  return (
    <div className="mx-auto my-8 flex h-full min-h-screen w-full max-w-7xl flex-1 flex-col items-center justify-start px-3 sm:px-5 md:px-7 lg:px-10 xl:px-8 2xl:px-12">
      <AuthHeader />
      {children}
    </div>
  )
}

export default Layout

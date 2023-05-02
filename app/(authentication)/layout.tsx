import { ReactNode } from "react"

import AuthHeader from "./AuthHeader"

interface Props {
  children?: ReactNode
}

const Layout = (props: Props) => {
  const { children } = props

  return (
    <div className="max-w-7xl px-2">
      <AuthHeader />
      {children}
    </div>
  )
}

export default Layout

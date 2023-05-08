import { ReactNode } from "react"

type ErrorBoxProps = {
  children: ReactNode
}

const ErrorBox = (props: ErrorBoxProps) => {
  const { children } = props

  return (
    <p className="flex h-4 items-center text-sm font-light leading-none text-rose-400">
      {children}
    </p>
  )
}

export default ErrorBox

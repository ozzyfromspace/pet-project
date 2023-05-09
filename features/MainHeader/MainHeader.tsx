import Link from "next/link"
import { Session } from "next-auth"

import { buttonVariants } from "@/components/ui/button"
import DarkModeToggle from "@/components/DarkModeToggle"

import { SettingsButton } from "./SettingsButton"

type MainHeaderProps = {
  session: Session
}

const MainHeader = (props: MainHeaderProps) => {
  const { session } = props

  return (
    <header className="flex w-full flex-wrap items-center justify-between px-3 py-2">
      <Link
        href="/"
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "px-0 text-xl",
        })}
      >
        PetProject
      </Link>
      <div className="flex items-center justify-between gap-2">
        <DarkModeToggle />
        <SettingsButton session={session} />
      </div>
    </header>
  )
}

export default MainHeader

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
    <header className="my-2 flex w-full items-center justify-between px-4">
      <Link
        href="/"
        // className="-mx-1 rounded-full p-1 font-medium text-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "text-xl",
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

import Link from "next/link"
import { Session } from "next-auth"

import DarkModeToggle from "@/components/DarkModeToggle"

import { SettingsButton } from "./SettingsButton"

type MainHeaderProps = {
  session: Session
}

const MainHeader = (props: MainHeaderProps) => {
  const { session } = props

  return (
    <header className="my-2 flex w-full items-center justify-between">
      <Link
        href="/"
        className="rounded-full p-1 font-medium text-primary underline-offset-4 ring-offset-background transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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

import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import DarkModeToggle from "@/components/DarkModeToggle"

import { SettingsButton } from "./SettingsButton"

const MainHeader = () => {
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
        <SettingsButton />
      </div>
    </header>
  )
}

export default MainHeader

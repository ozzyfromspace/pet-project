import { Session } from "next-auth"

import DarkModeToggle from "@/components/DarkModeToggle"

import { ProfileAvatar } from "./ProfileAvatar"

type MainHeaderProps = {
  session: Session
}

const MainHeader = (props: MainHeaderProps) => {
  const { session } = props

  return (
    <header className="my-2 flex w-full items-center justify-between">
      <h1 className="w-fit scroll-m-20 text-base font-semibold tracking-tight transition-colors">
        PetProject
      </h1>
      <div className="flex items-center justify-between gap-2">
        <DarkModeToggle />
        <ProfileAvatar
          src={session.user?.image || ""}
          initial={(session.user?.name ?? "U")[0].toUpperCase()}
        />
      </div>
    </header>
  )
}

export default MainHeader

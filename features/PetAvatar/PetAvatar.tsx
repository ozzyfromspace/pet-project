import { ReactNode } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

type PetAvatarProps = {
  src: string
  alt: string
  fallback?: ReactNode
  petName: string
}

export function PetAvatar(props: PetAvatarProps) {
  const { alt, src, fallback, petName } = props

  const _alt = alt || "pet"
  const _src = src || ""
  const _fallback = fallback ?? "P"
  const _petName = petName || "Pet"

  return (
    <div className="flex shrink-0 flex-col items-center justify-start gap-1 [&:first-child]:ml-4">
      <Button variant="outline" className="m-0 h-fit rounded-full p-0">
        <Avatar className="h-20 w-20">
          <AvatarImage src={_src} alt={_alt} />
          <AvatarFallback className="select-none">{_fallback}</AvatarFallback>
        </Avatar>
      </Button>
      <p className="scroll-m-20 text-sm font-light tracking-tight">
        {_petName}
      </p>
    </div>
  )
}

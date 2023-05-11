import { ReactNode } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type PetAvatarProps = {
  src: string
  alt: string
  fallback?: ReactNode
  petName: string
  fullScale?: boolean
}

export function PetAvatar(props: PetAvatarProps) {
  const { alt, src, fallback, petName, fullScale } = props

  const _alt = alt || "pet"
  const _src = src || ""
  const _fallback = fallback ?? "P"
  const _petName = petName || "Pet"

  return (
    <div
      className={`flex shrink-0 flex-col items-center justify-start gap-1 ${
        fullScale
          ? ""
          : "scale-[80%] opacity-80 transition-all duration-200 group-hover:opacity-100 group-focus-visible:scale-90 group-focus-visible:opacity-100 min-[580px]:group-hover:scale-90"
      }`}
    >
      <Avatar className="h-20 w-20">
        <AvatarImage src={_src} alt={_alt} />
        <AvatarFallback className="select-none">{_fallback}</AvatarFallback>
      </Avatar>
      <p className="scroll-m-20 text-base font-normal tracking-tight">
        {_petName}
      </p>
    </div>
  )
}

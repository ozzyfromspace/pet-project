import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type ProfileAvatarProps = {
  src: string
  initial: string
}

export function ProfileAvatar(props: ProfileAvatarProps) {
  const { src, initial } = props

  return (
    <Avatar className="h-full w-full">
      <AvatarImage src={src} alt="user-profile" />
      <AvatarFallback>{initial}</AvatarFallback>
    </Avatar>
  )
}

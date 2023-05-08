import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type ProfileAvatarProps = {
  src: string
  initial: string
}

export function ProfileAvatar(props: ProfileAvatarProps) {
  const { src, initial } = props

  return (
    <Avatar className="h-9 w-9">
      <AvatarImage src={src} alt="user-profile" />
      <AvatarFallback>{initial}</AvatarFallback>
    </Avatar>
  )
}

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { PetProfile } from "./Dashboard"

type DashboardProfileProps = {
  profile: PetProfile
}

const DashboardProfile = (props: DashboardProfileProps) => {
  const { profile } = props
  const { name, dob, sex, species } = profile

  return (
    <form>
      <div className="grid grid-cols-[auto,1fr] gap-2">
        <Label htmlFor="name" className="flex items-center justify-end">
          Name
        </Label>
        <Input id="name" defaultValue="Pedro Duarte" />
        <Label htmlFor="username" className="flex items-center justify-end">
          Username
        </Label>
        <Input id="username" defaultValue="@peduarte" />
        <Label htmlFor="username" className="flex items-center justify-end">
          A super long label
        </Label>
        <Input id="username" defaultValue="cool" />
      </div>
    </form>
  )
}

export default DashboardProfile

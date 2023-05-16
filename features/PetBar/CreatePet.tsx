import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

import {
  DashboardProfileInput,
  DateInput,
  GenderSelect,
} from "../Dashboard/DashboardProfile"
import { ServerPetProfile } from "../Dashboard/PetBarDashboard"

type InitialProfile = Omit<ServerPetProfile, "_id" | "imageData" | "owner">

const serverPetProfileDefault = {
  birthdate: "",
  fullname: "",
  gender: "",
  species: "",
} satisfies InitialProfile

export default function CreatePet() {
  const { register, handleSubmit } = useForm<InitialProfile>({
    defaultValues: serverPetProfileDefault,
  })

  return (
    <Dialog>
      <div className="flex shrink-0 scale-[80%] flex-col items-center justify-start gap-1 transition-all duration-200 focus-visible:scale-90 min-[580px]:hover:scale-90">
        <DialogTrigger asChild>
          <Button
            role="tab"
            variant="outline"
            className="mr-4 aspect-square h-20 w-20 rounded-full p-0"
          >
            <Plus className="h-4 w-4" />
            <p className="sr-only">Add a new pet</p>
          </Button>
        </DialogTrigger>
        <p className="invisible scroll-m-20 text-base font-normal tracking-tight opacity-80">
          Add a new pet
        </p>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create new pet</DialogTitle>
            <DialogDescription>
              Fill out your pet{"'"}s basic info. Click save when you{"'"}re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-[auto,1fr] gap-2">
              <Label
                htmlFor="fullname"
                className="flex items-center justify-end"
              >
                Full Name
              </Label>
              <DashboardProfileInput
                id="fullname"
                {...register("fullname")}
                placeholder="Ollie"
              />
              <Label
                htmlFor="birthdate"
                className="flex items-center justify-end"
              >
                Birthdate
              </Label>
              <DateInput id="birthdate" timestamp={""} />
              <Label htmlFor="gender" className="flex items-center justify-end">
                Gender
              </Label>
              <GenderSelect id="gender" />
              <Label
                htmlFor="species"
                className="flex items-center justify-end"
              >
                Species
              </Label>
              <DashboardProfileInput
                {...register("species")}
                id="species"
                placeholder="cat"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

async function onSubmit(data: InitialProfile) {
  console.log({ initialData: data })
}

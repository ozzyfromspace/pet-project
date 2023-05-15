import { ReactNode } from "react"
import { Tab } from "@headlessui/react"
import { Plus } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"

import { PetAvatar } from "./PetAvatar"

export type PetBarData = {
  id: string
  src: string
  alt: string
  name: string
  fallback: ReactNode
}

export type PetBarProps = { pets: PetBarData[] }

const PetBar = (props: PetBarProps) => {
  const { pets } = props

  return (
    <section className="my-1 flex items-center gap-3 py-2">
      {pets.map((pet) => (
        <Tab
          key={pet.id}
          className={buttonVariants({
            variant: "outline",
            className: "group m-0 h-fit p-0 [&:first-child]:ml-3",
          })}
        >
          <PetAvatar
            fullScale={pet.name === "Oliver"}
            src={pet.src}
            alt={pet.alt}
            petName={pet.name}
            fallback={pet.fallback}
          />
        </Tab>
      ))}
      <PostPet />
    </section>
  )
}

export default PetBar

function PostPet() {
  return (
    <div className="flex shrink-0 scale-[80%] flex-col items-center justify-start gap-1 transition-all duration-200 focus-visible:scale-90 min-[580px]:hover:scale-90">
      <Button
        role="tab"
        variant="outline"
        className="mr-4 aspect-square h-20 w-20 rounded-full p-0"
      >
        <Plus className="h-4 w-4" />
        <p className="sr-only">Add a new pet</p>
      </Button>
      <p className="invisible scroll-m-20 text-base font-normal tracking-tight opacity-80">
        Add a new pet
      </p>
    </div>
  )
}

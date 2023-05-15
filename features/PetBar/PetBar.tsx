import { ReactNode } from "react"
import { Tab } from "@headlessui/react"

import { buttonVariants } from "@/components/ui/button"

import CreatePet from "./CreatePet"
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
          {({ selected }) => (
            <PetAvatar
              fullScale={selected}
              src={pet.src}
              alt={pet.alt}
              petName={pet.name}
              fallback={pet.fallback}
            />
          )}
        </Tab>
      ))}
      <CreatePet />
    </section>
  )
}

export default PetBar

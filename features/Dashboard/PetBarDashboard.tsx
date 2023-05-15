"use client"

import { useMemo } from "react"
import { Tab } from "@headlessui/react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import PetBar, { PetBarData } from "../PetBar/PetBar"
import Dashboard, { PetProfile } from "./Dashboard"

type PetImageData = {
  src: string
  alt: string
  width: number
  height: number
}

export type ServerPetProfile = {
  _id: string
  owner: string
  fullname: string
  birthdate: string
  gender: string
  species: string
  imageData: PetImageData
}

export type PetBarDashboardProps = {
  pets: ServerPetProfile[]
}

const PetBarDashboard = (props: PetBarDashboardProps) => {
  const { pets } = props

  const petBarData = useMemo(
    () =>
      pets.map(
        (pet) =>
          ({
            id: pet._id,
            alt: pet.imageData.alt,
            name: pet.fullname,
            fallback: pet.fullname,
            src: pet.imageData.src,
          } satisfies PetBarData)
      ),
    [pets]
  )

  return (
    <Tab.Group>
      <ScrollArea className="w-full">
        <Tab.List>
          <PetBar pets={petBarData} />
          <ScrollBar orientation="horizontal" className="opacity-0" />
        </Tab.List>
      </ScrollArea>
      <Tab.Panels>
        {pets.map((pet) => {
          const profile = {
            fullname: pet.fullname,
            birthdate: pet.birthdate,
            gender: pet.gender,
            species: pet.species,
          } satisfies PetProfile

          return (
            <Tab.Panel key={pet._id} tabIndex={-1}>
              <Dashboard profile={profile} medications={[]} logs={{}} />
            </Tab.Panel>
          )
        })}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default PetBarDashboard

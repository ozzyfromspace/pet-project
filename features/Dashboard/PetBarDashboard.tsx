"use client"

import { Tab } from "@headlessui/react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import PetBar, { PetBarData } from "../PetBar/PetBar"
import Dashboard from "./Dashboard"
import mockPetData from "./mockPetData"

export type PetBarDashboardProps = {
  pets: PetBarData[]
}

const PetBarDashboard = (props: PetBarDashboardProps) => {
  const { pets } = props

  return (
    <Tab.Group>
      <ScrollArea className="w-full">
        <Tab.List>
          <PetBar pets={pets} />
          <ScrollBar orientation="horizontal" className="opacity-0" />
        </Tab.List>
      </ScrollArea>
      <Tab.Panels>
        {pets.map((pet) => (
          <Tab.Panel key={pet.id} tabIndex={-1}>
            <Dashboard
              profile={mockPetData.profile}
              medications={[]}
              logs={{}}
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default PetBarDashboard

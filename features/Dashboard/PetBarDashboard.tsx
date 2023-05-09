"use client"

import { Tab } from "@headlessui/react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import PetBar, { PetBarData } from "../PetBar/PetBar"
import Dashboard from "./Dashboard"

export type PetBarDashboardProps = {
  pets: PetBarData[]
}

const PetBarDashboard = (props: PetBarDashboardProps) => {
  const { pets } = props

  return (
    <Tab.Group>
      <Tab.List>
        <ScrollArea className="w-screen">
          <PetBar pets={pets} />
          <ScrollBar orientation="horizontal" className="opacity-0" />
        </ScrollArea>
      </Tab.List>
      <Tab.Panels>
        {pets.map((pet) => (
          <Tab.Panel key={pet.id} tabIndex={-1}>
            <Dashboard />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default PetBarDashboard

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
    <div>
      <Tab.Group>
        <div>
          <ScrollArea className="w-screen">
            <Tab.List>
              <PetBar pets={pets} />
            </Tab.List>
            <ScrollBar orientation="horizontal" className="opacity-0" />
          </ScrollArea>
          <Tab.Panels>
            {pets.map((pet) => (
              <Tab.Panel key={pet.id} tabIndex={-1}>
                <Dashboard />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  )
}

export default PetBarDashboard

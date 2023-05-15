"use client"

import { ReactNode } from "react"
import { Tab } from "@headlessui/react"
import { useMediaQuery } from "react-responsive"

import useFirstRender from "@/hooks/useFirstRender"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import DashboardProfile from "./DashboardProfile"

export type PetProfile = {
  fullname: string
  birthdate: string
  gender: string
  species: string
}

export enum MedicationFrequency {
  UNTIL = "UNTIL",
  FOREVER = "FOREVER",
}

export enum TimeBetweenMedication {
  HOURLY = "HOURLY",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

export type MedicationPeriod = {
  timeBetweenMedication: number
  unitOfTimeBetweenMedication: TimeBetweenMedication
} & (
  | {
      frequency: MedicationFrequency.UNTIL
      start: string
      stop: string
    }
  | {
      frequency: MedicationFrequency.FOREVER
      start: string
    }
)

export type PetMedication = {
  drugName: string
  quantityPerSession: string
  frequency: MedicationPeriod
}

export type DailyPetLog = {}

export type DashboardProps = {
  profile: PetProfile
  medications: PetMedication[]
  logs: DailyPetLog
}

const Dashboard = (props: DashboardProps) => {
  const { profile } = props
  const firstRender = useFirstRender()

  const isBigDashboard = useMediaQuery({
    query: "(min-width: 580px)",
  })

  return (
    <main className="mb-8 px-3">
      <ScrollArea>
        <Tab.Group vertical={firstRender ? true : isBigDashboard}>
          <div className="flex min-h-[max(14rem,55vh)] flex-col overflow-hidden rounded-sm border-[1px] border-slate-200 shadow-sm dark:border-slate-800 min-[580px]:flex-row">
            <Tab.List className="flex flex-row gap-2 bg-slate-50 p-2 dark:bg-slate-900 min-[580px]:flex-col">
              <DashboardTab>Profile</DashboardTab>
              <DashboardTab>Meds</DashboardTab>
              <DashboardTab>Logs</DashboardTab>
            </Tab.List>
            <Tab.Panels className="flex flex-1 flex-col items-start justify-start p-2">
              <Tab.Panel tabIndex={-1} className="w-full">
                <DashboardProfile profile={profile} />
              </Tab.Panel>
              <Tab.Panel tabIndex={-1}>Meds Content</Tab.Panel>
              <Tab.Panel tabIndex={-1}>Logs</Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </ScrollArea>
    </main>
  )
}

export default Dashboard

type DashboardTabProps = {
  children: ReactNode
}

const DashboardTab = (props: DashboardTabProps) => {
  const { children } = props

  return (
    <Tab
      className={buttonVariants({
        variant: "secondary",
        className:
          "inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-sm border-[1px] border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-900 ring-offset-background transition-all duration-200 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:border-slate-700 dark:text-slate-200 dark:hover:bg-gray-800 min-[580px]:flex-none",
      })}
    >
      {children}
    </Tab>
  )
}

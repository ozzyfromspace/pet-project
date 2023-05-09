"use client"

import { ReactNode } from "react"
import { Tab } from "@headlessui/react"

import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const Dashboard = () => {
  return (
    <div className="mb-8 px-3">
      <ScrollArea>
        <Tab.Group vertical>
          <div className="flex min-h-[max(14rem,55vh)] overflow-hidden rounded-sm border-[1px] border-slate-200 shadow-sm dark:border-slate-800">
            <Tab.List className="flex flex-col gap-3 bg-gray-100 p-2 dark:bg-gray-900">
              <DashboardTab>Tab 1</DashboardTab>
              <DashboardTab>Tab 2</DashboardTab>
              <DashboardTab>Tab 3</DashboardTab>
            </Tab.List>
            <Tab.Panels className="flex flex-1 items-center justify-center">
              <Tab.Panel>Content 1</Tab.Panel>
              <Tab.Panel>Content 2</Tab.Panel>
              <Tab.Panel>Content 3</Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </ScrollArea>
    </div>
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
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm border-[1px] border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-900 ring-offset-background transition-all duration-200 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:border-slate-700 dark:text-slate-200 dark:hover:bg-gray-800",
      })}
    >
      {children}
    </Tab>
  )
}

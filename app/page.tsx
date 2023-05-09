import { RedirectType } from "next/dist/client/components/redirect"
import { redirect } from "next/navigation"
import { getSession } from "@/features/AuthProvider"
import Dashboard from "@/features/Dashboard"
import PetBar from "@/features/PetBar"

import isSessionValid from "./isSessionValid"

export default async function IndexPage() {
  const session = await getSession()

  if (!isSessionValid(session)) {
    redirect("/login", RedirectType.replace)
  }

  return (
    <section>
      <div className="mt-5">
        <PetBar />
        <Dashboard />
      </div>
    </section>
  )
}

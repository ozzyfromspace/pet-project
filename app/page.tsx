import { RedirectType } from "next/dist/client/components/redirect"
import { redirect } from "next/navigation"
import { getSession } from "@/features/AuthProvider"
import PetBarDashboard from "@/features/Dashboard/PetBarDashboard"
import { petBarMockData } from "@/features/PetBar/petBarMockData"

import isSessionValid from "./isSessionValid"

export default async function IndexPage() {
  const session = await getSession()

  if (!isSessionValid(session)) {
    redirect("/login", RedirectType.replace)
  }

  return (
    <section>
      <div className="mt-5">
        <PetBarDashboard pets={petBarMockData} />
      </div>
    </section>
  )
}

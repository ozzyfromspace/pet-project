import { headers } from "next/dist/client/components/headers"
import { RedirectType } from "next/dist/client/components/redirect"
import { redirect } from "next/navigation"
import { getSession } from "@/features/AuthProvider"
import PetBarDashboard from "@/features/Dashboard/PetBarDashboard"
import { petBarMockData } from "@/features/PetBar/petBarMockData"

import ExpButton from "./ExpButton"
import GoButton from "./GoButton"
import isSessionValid from "./isSessionValid"

export default async function IndexPage() {
  const session = await getSession()

  if (!isSessionValid(session)) {
    redirect("/login", RedirectType.replace)
  }

  const cookie = headers().get("cookie") ?? ""

  return (
    <section className="pt-5">
      <GoButton cookie={cookie} />
      <ExpButton />
      <PetBarDashboard pets={petBarMockData} />
    </section>
  )
}

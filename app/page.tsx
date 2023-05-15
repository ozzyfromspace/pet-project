import { redirect } from "next/navigation"
import PetBarDashboard from "@/features/Dashboard/PetBarDashboard"
import MainHeader from "@/features/MainHeader"
import { petBarMockData } from "@/features/PetBar/petBarMockData"
import { getServerSession } from "next-auth"

import { authOptions } from "./api/auth/[...nextauth]/route"

export default async function IndexPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login?callbackUrl=/")
  }

  return (
    <section className="pt-5">
      <MainHeader />
      <PetBarDashboard pets={petBarMockData} />
    </section>
  )
}

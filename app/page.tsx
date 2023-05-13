import { headers } from "next/dist/client/components/headers"
import { redirect } from "next/navigation"
import PetBarDashboard from "@/features/Dashboard/PetBarDashboard"
import MainHeader from "@/features/MainHeader"
import { petBarMockData } from "@/features/PetBar/petBarMockData"
import { getServerSession } from "next-auth"

import ExpButton from "./ExpButton"
import GoButton from "./GoButton"
import { authOptions } from "./api/auth/[...nextauth]/route"

export default async function IndexPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login?callbackUrl=/")
  }

  const cookie = headers().get("cookie") ?? ""

  return (
    <section className="pt-5">
      <GoButton cookie={cookie} />
      <ExpButton />
      <MainHeader />
      <PetBarDashboard pets={petBarMockData} />
    </section>
  )
}

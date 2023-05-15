import { redirect } from "next/navigation"
import PetBarDashboard, {
  ServerPetProfile,
} from "@/features/Dashboard/PetBarDashboard"
import MainHeader from "@/features/MainHeader"
import { getServerSession } from "next-auth"

import goServerFetch from "@/lib/goServerfetch"

import { authOptions } from "./api/auth/[...nextauth]/route"

export default async function IndexPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login?callbackUrl=/")
  }

  const res = await goServerFetch("/pets")
  const { pets } = (await res.json()) as { pets: ServerPetProfile[] }

  return (
    <section className="pt-5">
      <MainHeader />
      <PetBarDashboard pets={pets} />
    </section>
  )
}

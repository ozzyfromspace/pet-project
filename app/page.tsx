import { RedirectType } from "next/dist/client/components/redirect"
import { redirect } from "next/navigation"
import { getSession } from "@/features/AuthProvider"

import isSessionValid from "./isSessionValid"

export default async function IndexPage() {
  const session = await getSession()

  if (!isSessionValid(session)) {
    redirect("/login", RedirectType.replace)
  }

  return <section>Welcome, {session.user?.name || "User"}</section>
}

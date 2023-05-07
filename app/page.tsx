import { headers } from "next/dist/client/components/headers"
import { RedirectType } from "next/dist/client/components/redirect"
import { redirect } from "next/navigation"
import { getSession } from "@/features/AuthProvider"

import TestLogout from "./TestLogout"
import isSessionValid from "./isSessionValid"

export default async function IndexPage() {
  const session = await getSession(headers().get("cookie") ?? "")

  if (!isSessionValid(session)) {
    redirect("/login", RedirectType.replace)
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <p className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        This is just a pet project
      </p>
      <TestLogout />
    </section>
  )
}

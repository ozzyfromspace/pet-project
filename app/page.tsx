import { RedirectType } from "next/dist/client/components/redirect"
import { redirect } from "next/navigation"
import { getSession } from "@/features/AuthProvider"
import { PetAvatar } from "@/features/PetAvatar/PetAvatar"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import isSessionValid from "./isSessionValid"

export default async function IndexPage() {
  const session = await getSession()

  if (!isSessionValid(session)) {
    redirect("/login", RedirectType.replace)
  }

  return (
    <section>
      <div className="mt-5">
        <ScrollArea className="w-screen">
          <div className="my-3 flex gap-4 py-2">
            <PetAvatar src="" alt="" petName="Oliver" fallback="O" />
            <PetAvatar src="" alt="" petName="Noel" fallback="N" />
            <PetAvatar src="" alt="" petName="Hawking" fallback="H" />
            <PetAvatar src="" alt="" petName="Oliver" fallback="O" />
            <PetAvatar src="" alt="" petName="Noel" fallback="N" />
            <PetAvatar src="" alt="" petName="Hawking" fallback="H" />
            <PetAvatar src="" alt="" petName="Oliver" fallback="O" />
            <PetAvatar src="" alt="" petName="Noel" fallback="N" />
            <Button
              variant="outline"
              className="mr-4 aspect-square h-20 w-20 rounded-full p-0"
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add a new pet</span>
            </Button>
          </div>
          <ScrollBar orientation="horizontal" className="opacity-0" />
        </ScrollArea>
      </div>
    </section>
  )
}

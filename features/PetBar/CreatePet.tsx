import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function CreatePet() {
  return (
    <div className="flex shrink-0 scale-[80%] flex-col items-center justify-start gap-1 transition-all duration-200 focus-visible:scale-90 min-[580px]:hover:scale-90">
      <Button
        role="tab"
        variant="outline"
        className="mr-4 aspect-square h-20 w-20 rounded-full p-0"
      >
        <Plus className="h-4 w-4" />
        <p className="sr-only">Add a new pet</p>
      </Button>
      <p className="invisible scroll-m-20 text-base font-normal tracking-tight opacity-80">
        Add a new pet
      </p>
    </div>
  )
}

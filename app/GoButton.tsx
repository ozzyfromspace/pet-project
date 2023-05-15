"use client"

import { useGoFetch } from "@/features/GoAuthProvider"

import { Button } from "@/components/ui/button"

const GoButton = () => {
  const { gofetch } = useGoFetch()

  async function getPets() {
    const res = await gofetch("/pets")
    const data = await res.json()
    console.log(data)
  }

  return (
    <div>
      <Button variant="secondary" onClick={getPets}>
        Tell Go Who You Are
      </Button>
    </div>
  )
}

export default GoButton

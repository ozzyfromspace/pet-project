"use client"

import { Button } from "@/components/ui/button"

async function exp() {
  await fetch("http://localhost:8080/experiment")
}

const ExpButton = () => {
  return (
    <div>
      <Button variant="secondary" onClick={exp}>
        Experiment Button
      </Button>
    </div>
  )
}

export default ExpButton

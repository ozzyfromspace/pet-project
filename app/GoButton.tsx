"use client"

import { Button } from "@/components/ui/button"

function tellGoWhoWeAre(cookie: string) {
  return async function () {
    console.log("sending...", cookie)

    const res = await fetch("http://localhost:8080/thisisme", {
      headers: {
        Authorization: `__next-auth-token__ ${cookie}`,
      },
    })
    const data = await res.json()
    console.log("data --", data)
  }
}

type GoButtonProps = {
  cookie: string
}

const GoButton = (props: GoButtonProps) => {
  const { cookie } = props

  return (
    <div>
      <Button variant="secondary" onClick={tellGoWhoWeAre(cookie)}>
        Tell Go Who You Are
      </Button>
    </div>
  )
}

export default GoButton

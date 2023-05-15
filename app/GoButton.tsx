"use client"

import { Button } from "@/components/ui/button"

function tellGoWhoWeAre(cookie: string) {
  const GO_SERVER_URL =
    process.env["NEXT_PUBLIC_GO_SERVER_URL"] ||
    "http://no-go-server-url-was-provided"

  return async function () {
    const res = await fetch(`${GO_SERVER_URL}/api/v1/pets`, {
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

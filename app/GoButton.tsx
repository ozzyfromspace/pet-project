"use client"

import { Button } from "@/components/ui/button"

function tellGoWhoWeAre(baseURL: string, cookie: string) {
  // const GO_SERVER_URL =
  //   process.env["GO_SERVER_URL"] || "http://no-go-server-url-was-provided"

  return async function () {
    const res = await fetch(`${baseURL}/api/v1/`, {
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
  baseURL: string
}

const GoButton = (props: GoButtonProps) => {
  const { cookie, baseURL } = props

  return (
    <div>
      <Button variant="secondary" onClick={tellGoWhoWeAre(baseURL, cookie)}>
        Tell Go Who You Are
      </Button>
    </div>
  )
}

export default GoButton

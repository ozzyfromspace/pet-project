import { headers } from "next/dist/client/components/headers"
import { Session } from "next-auth"

export default async function getSession(): Promise<Session | null> {
  const baseURL = process.env["NEXTAUTH_URL"] || "no-url"

  const response = await fetch(`${baseURL}/api/auth/session`, {
    headers: {
      cookie: headers().get("cookie") ?? "",
    },
    cache: "no-cache",
  })

  console.log({ headers: headers().get("cookie") ?? "" })

  const session = await response.json()

  return Object.keys(session).length > 0 ? session : null
}

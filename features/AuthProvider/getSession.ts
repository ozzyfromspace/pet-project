import { Session } from "next-auth"

export default async function getSession(cookie: string): Promise<Session> {
  const baseURL = process.env["NEXTAUTH_URL"] || "no-url"

  const response = await fetch(`${baseURL}/api/auth/session`, {
    headers: {
      cookie,
    },
  })

  const session = await response.json()

  return Object.keys(session).length > 0 ? session : null
}

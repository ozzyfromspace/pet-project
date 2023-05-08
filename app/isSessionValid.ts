import { Session } from "next-auth"

export default function isSessionValid(
  session: Session | null
): session is Session {
  if (session === null) return false

  if (session?.user === undefined) return false
  if (!session?.expires) return false

  const expDate = new Date(session?.expires)

  if (!isValidDate(expDate)) return false

  if (expDate <= new Date()) return false

  return true
}

// source: https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
function isValidDate(d: unknown) {
  return d instanceof Date && !isNaN(d as unknown as number)
}

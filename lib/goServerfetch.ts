import { headers } from "next/dist/client/components/headers"

export default async function goServerFetch(
  relativePath: string,
  init?: RequestInit | undefined
) {
  const GO_SERVER_URL =
    process.env["NEXT_PUBLIC_GO_SERVER_URL"] ||
    "http://no-go-server-url-was-provided"

  const cookie = headers().get("cookie") ?? ""

  const authorizedInit = {
    headers: {
      Authorization: `__next-auth-token__ ${cookie}`,
    },
    ...init,
  }

  return fetch(`${GO_SERVER_URL}/api/v1${relativePath}`, authorizedInit)
}

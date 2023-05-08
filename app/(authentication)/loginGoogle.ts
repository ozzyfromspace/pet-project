import { signIn } from "next-auth/react"

export default async function loginGoogle() {
  const signinResponse = await signIn("google")
  console.log({ signinResponse })
  setTimeout(() => {}, 20000)
}

"use client"

import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"

const CredentialsLoginButton = () => {
  return (
    <Button
      className="w-full"
      variant="default"
      onClick={handleCredentialsLogin}
    >
      Sign In With Email
    </Button>
  )
}

export default CredentialsLoginButton

async function handleCredentialsLogin() {
  await signIn("login-credentials", {
    email: "email-address",
    password: "user-password",
    redirect: true,
    callbackUrl: "/",
  })
}

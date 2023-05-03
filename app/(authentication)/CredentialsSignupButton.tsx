"use client"

import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"

const CredentialsSignupButton = () => {
  return (
    <Button className="w-full" variant="default" onClick={handleRegistration}>
      Sign Up With Email
    </Button>
  )
}

export default CredentialsSignupButton

async function handleRegistration() {
  await signIn("registration-credentials", {
    email: "email-address",
    password: "user-password",
    name: "John Doe",
    redirect: true,
    callbackUrl: "/",
  })
}

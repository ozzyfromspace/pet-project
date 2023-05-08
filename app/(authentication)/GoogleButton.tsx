"use client"

import { FaGoogle } from "react-icons/fa"

import { Button } from "@/components/ui/button"

import loginGoogle from "./loginGoogle"

const GoogleButton = () => {
  return (
    <Button
      onClick={loginGoogle}
      className="flex w-full gap-1"
      variant="outline"
    >
      <FaGoogle className="h-4 w-4" /> <span>Google</span>
    </Button>
  )
}

export default GoogleButton

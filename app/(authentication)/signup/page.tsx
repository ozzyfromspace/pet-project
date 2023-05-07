import { getSession } from "@/features/AuthProvider"
import { headers } from "next/dist/client/components/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { FaGoogle } from "react-icons/fa"

import isSessionValid from "@/app/isSessionValid"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import CredentialsSignupButton from "../CredentialsSignupButton"

type CardProps = React.ComponentProps<typeof Card> & { searchParams: any }

function delay() {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 5000)
  })
}

export default async function Signup({ className, ...props }: CardProps) {
  // do not pass searchParams, per react dev warning
  const { searchParams, ...rest } = props
  const session = await getSession(headers().get("cookie") ?? "")

  if (isSessionValid(session)) {
    redirect("/")
  }

  return (
    <Card className={cn("mx-auto w-full max-w-sm", className)} {...rest}>
      <CardHeader>
        <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-medium tracking-tight transition-colors first:mt-0">
          Sign Up
        </CardTitle>
        <CardDescription className="text-sm font-medium leading-none">
          Track your pets health
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="Password" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            type="password"
            id="confirm-password"
            placeholder="Confirm Password"
          />
        </div>
        <CredentialsSignupButton />
        <div>
          <p className="scroll-m-20 text-center text-base font-medium tracking-tight">
            Or
          </p>
        </div>
        <Button className="flex w-full gap-1" variant="outline">
          <FaGoogle className="h-4 w-4" /> <span>Google</span>
        </Button>
      </CardContent>
      <CardFooter className="grid gap-4">
        <div className="-mt-2 flex w-full items-center justify-center gap-0.5 text-sm font-extralight leading-none">
          <span>Already have an account?</span>
          <Link
            href="/login"
            className="rounded-full p-1 font-medium text-primary underline-offset-4 ring-offset-background transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

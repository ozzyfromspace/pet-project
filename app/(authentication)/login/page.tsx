import { headers } from "next/dist/client/components/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getSession } from "@/features/AuthProvider"

import { cn } from "@/lib/utils"
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
import isSessionValid from "@/app/isSessionValid"

import CredentialsLoginButton from "../CredentialsLoginButton"
import GoogleButton from "../GoogleButton"

type CardProps = React.ComponentProps<typeof Card> & { searchParams: any }

export default async function Login({ className, ...props }: CardProps) {
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
          Sign In
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
      </CardContent>
      <CardFooter className="grid gap-4">
        <CredentialsLoginButton />
        <div>
          <p className="scroll-m-20 text-center text-base font-medium tracking-tight">
            Or
          </p>
        </div>
        <GoogleButton />
        <div className="-mt-2 flex w-full items-center justify-center gap-0.5 text-sm font-extralight leading-none">
          <span>Don&rsquo;t have an account?</span>
          <Link
            href="/signup"
            className="rounded-full p-1 font-medium text-primary underline-offset-4 ring-offset-background transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

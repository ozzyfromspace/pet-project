import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import SignupForm from "./SignupForm"

export default function Signup() {
  return (
    <Card className={cn("mx-auto w-full max-w-sm")}>
      <CardHeader>
        <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-medium tracking-tight transition-colors first:mt-0">
          Sign Up
        </CardTitle>
        <CardDescription className="text-sm font-medium leading-none">
          Track your pets health
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
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

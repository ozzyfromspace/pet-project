import Link from "next/link"
import { FaGoogle } from "react-icons/fa"

import { cn } from "@/lib/utils"
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

type CardProps = React.ComponentProps<typeof Card> & { searchParams: any }

export default function Signup({ className, ...props }: CardProps) {
  // do not pass searchParams, per react dev warning
  const { searchParams, ...rest } = props

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
      </CardContent>
      <CardFooter className="grid gap-4">
        <Button className="w-full" variant="default">
          Sign Up With Email
        </Button>
        <div>
          <p className="scroll-m-20 text-center text-base font-medium tracking-tight">
            Or
          </p>
        </div>
        <Button className="flex w-full gap-1" variant="outline">
          <FaGoogle className="h-4 w-4" /> <span>Google</span>
        </Button>
        <div className="-mt-2 flex w-full items-center justify-center gap-2 text-sm font-extralight leading-none">
          <span className="-mr-3">Already have an account?</span>
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

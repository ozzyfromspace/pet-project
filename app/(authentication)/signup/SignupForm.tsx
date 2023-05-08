"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { FaGoogle } from "react-icons/fa"
import * as yup from "yup"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import ErrorBox from "../ErrorBox"

type FormData = {
  email: string
  password: string
  confirmPassword: string
}

const passwordValidationRule = yup
  .string()
  .required("Password is required")
  .min(8, "Password needs atleast 8 characters")
  .max(64, "Password cannot have more than 64 characters")
  .matches(/[0-9]/, { message: "Password needs a number" })
  .matches(/[A-Z]/, { message: "Password needs at least one uppercase letter" })
  .matches(/[a-z]/, { message: "Password needs at least one lowercase letter" })
  .matches(/[!@#\$%\^&\*\._\-\+=~]/, { message: "Needs atleast one symbol" })

const yupValidationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please double-check your email"),
  password: passwordValidationRule,
  // motivated by: https://stackoverflow.com/questions/61862252/yup-schema-validation-password-and-confirmpassword-doesnt-work
  confirmPassword: passwordValidationRule.oneOf(
    [yup.ref("password")],
    "Passwords must match"
  ),
})

const SignupForm = () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(yupValidationSchema),
  })

  const { errors, isSubmitting } = formState

  return (
    <form className="grid gap-2.5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="jane@example.com"
          {...register("email")}
        />
        <ErrorBox>{errors.email?.message}</ErrorBox>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          {...register("password")}
        />
        <ErrorBox>{errors.password?.message}</ErrorBox>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          type="password"
          id="confirm-password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        <ErrorBox>{errors.confirmPassword?.message}</ErrorBox>
      </div>

      <Button
        type="submit"
        className="w-full"
        variant="default"
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? "Please Wait" : "Sign Up With Email"}
      </Button>
      <div>
        <p className="scroll-m-20 text-center text-base font-medium tracking-tight">
          Or
        </p>
      </div>
      <Button
        className="flex w-full gap-1"
        variant="outline"
        type="button"
        onClick={handleRegisterGoogle}
      >
        <FaGoogle className="h-4 w-4" /> <span>Google</span>
      </Button>
    </form>
  )
}

export default SignupForm

async function onSubmit(data: FormData) {
  await signIn("registration-credentials", {
    email: data.email,
    password: data.password,
    name: "no-name",
    redirect: true,
    callbackUrl: "/",
  })
}

async function handleRegisterGoogle() {
  await signIn("google", {
    redirect: true,
    callbackUrl: "/",
  })
}

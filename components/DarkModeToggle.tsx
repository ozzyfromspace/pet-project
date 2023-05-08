"use client"

import { useCallback } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "./ui/button"

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme()

  const toggleDarkmode = useCallback(
    () => setTheme(theme === "light" ? "dark" : "light"),
    [theme, setTheme]
  )

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleDarkmode}
      className="m-0 aspect-square rounded-full p-0"
    >
      <Sun className="h-6 w-6 rotate-0 scale-100 text-slate-700 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default DarkModeToggle

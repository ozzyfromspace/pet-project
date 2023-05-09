import AuthProvider, { getSession } from "@/features/AuthProvider"
import MainHeader from "@/features/MainHeader/MainHeader"

import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import AuthHeader from "./(authentication)/AuthHeader"
import isSessionValid from "./isSessionValid"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getSession()

  const sessionValid = isSessionValid(session)

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AuthProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="mx-auto min-h-screen max-w-7xl">
              {sessionValid ? <MainHeader session={session} /> : <AuthHeader />}
              {children}
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

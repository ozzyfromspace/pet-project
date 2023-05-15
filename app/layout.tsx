import AuthProvider from "@/features/AuthProvider"
import GoAuthProvider from "@/features/GoAuthProvider/GoAuthProvider"

import "@/styles/globals.css"
import { Metadata } from "next"
import { headers } from "next/dist/client/components/headers"
import { getServerSession } from "next-auth"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import { authOptions } from "./api/auth/[...nextauth]/route"

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
  const session = await getServerSession(authOptions)
  const cookie = headers().get("cookie") ?? ""

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
            <GoAuthProvider cookie={cookie}>
              <div className="mx-auto min-h-screen max-w-7xl">{children}</div>
            </GoAuthProvider>
            <TailwindIndicator />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

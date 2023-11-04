import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import CookiesProviderWrapper from "../components/providers/CookiesProviderWrapper"

import Navbar from "@/components/navbar/navbar"
import QueryClientProviderWrapper from "@/components/providers/QueryClientProviderWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Commonplace Book of Words",
  description:
    "Your guide to making your words less common and more articulate!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProviderWrapper>
          <Navbar></Navbar>
          <CookiesProviderWrapper>{children}</CookiesProviderWrapper>
        </QueryClientProviderWrapper>
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import CookiesProviderWrapper from "./CookiesProviderWrapper"

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
        <CookiesProviderWrapper>{children}</CookiesProviderWrapper>
      </body>
    </html>
  )
}
